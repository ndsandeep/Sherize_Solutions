import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  HeartHandshake,
  Home,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import workFromHomeImg from "@/assets/images/empowerment/work-from-home.jpg";
import flexibleHoursImg from "@/assets/images/empowerment/flexible-hours.jpg";
import learningSkillsImg from "@/assets/images/empowerment/learning-skills.jpg";
import careerEarningsImg from "@/assets/images/empowerment/career-earnings.jpg";
import { Reveal } from "@/components/shared/Reveal";
import { KineticHeading } from "@/components/shared/KineticHeading";
import { dataService } from "@/services/dataService";

const iconsMap = [Home, Clock, GraduationCap, TrendingUp, HeartHandshake, Sparkles];

const FALLBACK_IMAGES = [
  workFromHomeImg,
  flexibleHoursImg,
  learningSkillsImg,
  careerEarningsImg,
];

function resolveFeatureImage(feature, index) {
  const title = (feature?.title || "").toLowerCase();
  if (title.includes("home") || title.includes("remote")) return workFromHomeImg;
  if (title.includes("flexible") || title.includes("hour")) return flexibleHoursImg;
  if (title.includes("learn") || title.includes("skill")) return learningSkillsImg;
  if (title.includes("career") || title.includes("earn")) return careerEarningsImg;
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function createTitleTexture(gl, text, font) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const fontSize = 30;

  ctx.font = `600 ${fontSize}px ${font}`;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width) + 48;
  const textHeight = Math.ceil(fontSize * 1.55);

  canvas.width = Math.max(256, textWidth * dpr);
  canvas.height = textHeight * dpr;

  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = `600 ${fontSize}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#101D2B";
  ctx.fillText(text, canvas.width / (2 * dpr), textHeight / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return {
    texture,
    width: canvas.width / dpr,
    height: canvas.height / dpr,
  };
}

const CARD_VERTEX = /* glsl */ `
  precision highp float;

  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uCurve;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Subtle cylindrical curvature across each card surface
    p.z -= (p.x * p.x) * uCurve;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const CARD_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec2 uImageSizes;
  uniform vec2 uPlaneSizes;
  uniform sampler2D tMap;
  uniform float uFocus;
  uniform float uRadius;

  varying vec2 vUv;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
  }

  void main() {
    vec2 ratio = vec2(
      min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
      min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
    );

    // Slight top bias (0.45) to keep portraits well framed
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.55
    );

    vec4 tex = texture2D(tMap, uv);

    // Rounded rectangle mask
    vec2 boxHalf = vec2(0.5);
    float dist = roundedBoxSDF(vUv - 0.5, boxHalf, uRadius);
    float alpha = 1.0 - smoothstep(-0.004, 0.004, dist);
    if (alpha < 0.01) discard;

    // Subtle navy depth shading on side cards, crisp clarity on center card
    vec3 navyTint = vec3(0.063, 0.114, 0.169);
    vec3 color = mix(navyTint, tex.rgb, mix(0.78, 1.0, uFocus));

    // Gentle bottom vignette for visual grounding
    float bottomGrad = smoothstep(0.42, 0.0, vUv.y);
    color = mix(color, navyTint, bottomGrad * mix(0.35, 0.22, uFocus));

    // Subtle teal-gold rim highlight on the active centered card
    float borderMask = smoothstep(-0.016, -0.004, dist) * (1.0 - smoothstep(-0.004, 0.004, dist));
    vec3 tealRim = vec3(0.086, 0.490, 0.553);
    vec3 goldRim = vec3(0.839, 0.639, 0.357);
    vec3 rimColor = mix(tealRim, goldRim, smoothstep(0.0, 1.0, vUv.x));
    color = mix(color, rimColor, borderMask * mix(0.15, 0.85, uFocus));

    gl_FragColor = vec4(color, alpha * mix(0.84, 1.0, uFocus));
  }
`;

const TITLE_VERTEX = /* glsl */ `
  precision highp float;

  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const TITLE_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(tMap, vUv);
    float alpha = color.a * uOpacity;
    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color.rgb, alpha);
  }
`;

class GalleryItem {
  constructor({
    geometry,
    gl,
    item,
    index,
    totalCount,
    logicalIndex,
    scene,
    screen,
    viewport,
    bend,
    font,
    onTextureReady,
  }) {
    this.gl = gl;
    this.item = item;
    this.index = index;
    this.totalCount = totalCount;
    this.logicalIndex = logicalIndex;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.font = font;
    this.onTextureReady = onTextureReady;
    this.extra = 0;

    this.createCard(geometry);
    this.createTitle();
    this.onResize();
  }

  createCard(geometry) {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.texture = texture;

    this.program = new Program(this.gl, {
      depthTest: true,
      depthWrite: true,
      transparent: true,
      vertex: CARD_VERTEX,
      fragment: CARD_FRAGMENT,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [1, 1] },
        uImageSizes: { value: [1, 1] },
        uFocus: { value: 0 },
        uRadius: { value: 0.065 },
        uCurve: { value: 0.14 },
      },
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.item.image;
    img.onload = () => {
      if (this.disposed) return;
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
      this.onTextureReady?.();
    };

    this.plane = new Mesh(this.gl, { geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    const { texture, width, height } = createTitleTexture(
      this.gl,
      this.item.title,
      this.font,
    );
    this.titleTexture = texture;
    this.titleNaturalWidth = width;
    this.titleNaturalHeight = height;

    const geometry = new Plane(this.gl);
    this.titleProgram = new Program(this.gl, {
      vertex: TITLE_VERTEX,
      fragment: TITLE_FRAGMENT,
      uniforms: {
        tMap: { value: texture },
        uOpacity: { value: 1 },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    this.titleMesh = new Mesh(this.gl, { geometry, program: this.titleProgram });
    this.titleMesh.setParent(this.plane);
  }

  update(scroll, direction) {
    const baseX = this.x - scroll.current - this.extra;
    const widthHalf = this.widthTotal / 2;
    const planeHalf = this.planeBaseWidth / 2;

    if (direction === "right" && baseX + planeHalf < -widthHalf) {
      this.extra -= this.widthTotal;
    } else if (direction === "left" && baseX - planeHalf > widthHalf) {
      this.extra += this.widthTotal;
    }

    const x = this.x - scroll.current - this.extra;

    // Smooth circular arc + 3D depth separation
    const halfSpan = this.viewport.width * 0.56;
    const absBend = Math.max(0.2, Math.abs(this.bend));
    const radius = (halfSpan * halfSpan + absBend * absBend) / (2 * absBend);
    const effectiveX = Math.min(Math.abs(x), halfSpan);
    const arc = radius - Math.sqrt(Math.max(0, radius * radius - effectiveX * effectiveX));

    // Focus factor (1 at center, 0 on outer cards)
    const normDist = Math.abs(x) / Math.max(this.width * 0.92, 0.001);
    const focus = Math.exp(-normDist * normDist * 1.45);
    const scaleMult = lerp(0.84, 1.05, focus);

    this.plane.scale.x = this.planeBaseWidth * scaleMult;
    this.plane.scale.y = this.planeBaseHeight * scaleMult;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.program.uniforms.uFocus.value = focus;

    this.plane.position.x = x;
    this.plane.position.y = -arc * 0.78 + 0.45;
    this.plane.position.z = -arc * 1.35 + focus * 0.9;

    const sign = x >= 0 ? 1 : -1;
    this.plane.rotation.z = -sign * Math.asin(Math.min(1, effectiveX / radius)) * 0.52;
    this.plane.rotation.y = -Math.atan2(x, radius) * 0.78;

    // Keep title cleanly anchored beneath the card without inheriting inverse scale distortion
    const worldTitleHeight = (this.titleNaturalHeight / this.screen.height) * this.viewport.height * 0.92;
    const worldTitleWidth = worldTitleHeight * (this.titleNaturalWidth / Math.max(1, this.titleNaturalHeight));
    this.titleMesh.scale.set(
      worldTitleWidth / this.plane.scale.x,
      worldTitleHeight / this.plane.scale.y,
      1,
    );
    this.titleMesh.position.set(0, -0.5 - (worldTitleHeight / this.plane.scale.y) * 0.85, 0.02);
    this.titleProgram.uniforms.uOpacity.value = lerp(0.42, 1.0, focus);

    return { x: Math.abs(x), logicalIndex: this.logicalIndex };
  }

  onResize({ screen, viewport, bend } = {}) {
    if (screen) this.screen = screen;
    if (viewport) this.viewport = viewport;
    if (typeof bend === "number") this.bend = bend;

    const isMobile = this.screen.width < 640;
    const isTablet = this.screen.width >= 640 && this.screen.width < 1024;

    const targetPixelWidth = isMobile
      ? Math.min((this.screen.width - 88) / 1.1, this.screen.width * 0.63, 270)
      : isTablet
        ? this.screen.height * 0.7 * 0.96
        : this.screen.height * 0.72 * 0.96;

    const targetPixelHeight = isMobile
      ? Math.min(this.screen.height * 0.68, Math.max(targetPixelWidth * 1.15, 224))
      : isTablet
        ? this.screen.height * 0.7
        : this.screen.height * 0.72;

    this.planeBaseHeight = (this.viewport.height * targetPixelHeight) / this.screen.height;
    this.planeBaseWidth = (this.viewport.width * targetPixelWidth) / this.screen.width;

    const paddingPx = isMobile ? 28 : isTablet ? 40 : 54;
    this.padding = (this.viewport.width * paddingPx) / this.screen.width;

    this.width = this.planeBaseWidth + this.padding;
    this.widthTotal = this.width * this.totalCount;
    this.x = this.width * this.index;

    this.program.uniforms.uCurve.value = isMobile ? 0.08 : 0.14;
  }

  dispose() {
    this.disposed = true;
    this.plane?.setParent(null);
    this.titleMesh?.setParent(null);
  }
}

function CircularGalleryCanvas({
  items,
  activeIndex,
  onActiveChange,
  onCenterClick,
  onDragStart,
  onCenterMetricsChange,
  reducedMotion,
  stepRef,
}) {
  const containerRef = useRef(null);
  const onActiveChangeRef = useRef(onActiveChange);
  onActiveChangeRef.current = onActiveChange;
  const onCenterClickRef = useRef(onCenterClick);
  onCenterClickRef.current = onCenterClick;
  const onDragStartRef = useRef(onDragStart);
  onDragStartRef.current = onDragStart;
  const onCenterMetricsChangeRef = useRef(onCenterMetricsChange);
  onCenterMetricsChangeRef.current = onCenterMetricsChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !items.length) return;

    let renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.canvas.style.touchAction = "pan-y";
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 0, 20);
    const scene = new Transform();
    const planeGeometry = new Plane(gl, { heightSegments: 24, widthSegments: 48 });

    // Repeat items to guarantee seamless circular fill across wide viewports
    const repeatFactor = items.length <= 4 ? 3 : 2;
    const expandedItems = [];
    for (let r = 0; r < repeatFactor; r += 1) {
      items.forEach((item, idx) => {
        expandedItems.push({ item, logicalIndex: idx });
      });
    }

    const getScreenAndViewport = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
      const fovRad = (camera.fov * Math.PI) / 180;
      const vpHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const vpWidth = vpHeight * camera.aspect;
      const bend = width < 640 ? 1.85 : width < 1024 ? 3.1 : 4.4;
      return {
        screen: { width, height },
        viewport: { width: vpWidth, height: vpHeight },
        bend,
      };
    };

    let { screen, viewport, bend } = getScreenAndViewport();
    const scroll = {
      ease: reducedMotion ? 1 : 0.085,
      current: 0,
      target: 0,
      last: 0,
    };

    let rafId = null;
    let isVisible = true;
    let needsRender = true;
    let isDragging = false;
    let pointerDown = false;
    let allowDrag = false;
    let startX = 0;
    let startY = 0;
    let scrollAtStart = 0;
    let dragDistance = 0;
    let lastDragEndTime = 0;
    let activePointerId = null;
    let lastReportedIndex = activeIndex;

    const isMobileViewport = () => window.innerWidth < 640;

    const scheduleRender = () => {
      needsRender = true;
      if (!rafId && isVisible) {
        rafId = requestAnimationFrame(update);
      }
    };

    const font = '"Sora", ui-sans-serif, system-ui, sans-serif';
    const galleryItems = expandedItems.map(
      ({ item, logicalIndex }, index) =>
        new GalleryItem({
          geometry: planeGeometry,
          gl,
          item,
          index,
          totalCount: expandedItems.length,
          logicalIndex,
          scene,
          screen,
          viewport,
          bend,
          font,
          onTextureReady: scheduleRender,
        }),
    );

    const publishCenterMetrics = () => {
      const sample = galleryItems[0];
      if (!sample) return;
      const centerZ = 0.9;
      const perspectiveFactor = camera.position.z / (camera.position.z - centerZ);
      const vpHeightAtCard = viewport.height / perspectiveFactor;
      const vpWidthAtCard = viewport.width / perspectiveFactor;
      const cardWidthPx = ((sample.planeBaseWidth * 1.05) / vpWidthAtCard) * screen.width;
      const cardHeightPx = ((sample.planeBaseHeight * 1.05) / vpHeightAtCard) * screen.height;
      const offsetYPx = -(0.45 / vpHeightAtCard) * screen.height;
      const radiusPx = 0.065 * Math.min(cardWidthPx, cardHeightPx);

      onCenterMetricsChangeRef.current?.({
        width: Math.round(cardWidthPx),
        height: Math.round(cardHeightPx),
        offsetY: Math.round(offsetYPx),
        radius: Math.round(radiusPx),
      });
    };

    publishCenterMetrics();

    // Start centered on the first copy's activeIndex (middle copy avoids initial edge wrap jump)
    const initialCopyIndex = items.length + activeIndex;
    const itemWidth = galleryItems[0]?.width || 1;
    scroll.current = initialCopyIndex * itemWidth;
    scroll.target = scroll.current;
    scroll.last = scroll.current;

    const snapToNearest = () => {
      const w = galleryItems[0]?.width || 1;
      const idx = Math.round(scroll.target / w);
      scroll.target = idx * w;
      scheduleRender();
    };

    const stepBy = (deltaSteps) => {
      const w = galleryItems[0]?.width || 1;
      const currentIdx = Math.round(scroll.target / w);
      scroll.target = (currentIdx + deltaSteps) * w;
      if (reducedMotion) {
        scroll.current = scroll.target;
      }
      scheduleRender();
    };

    const goToLogicalIndex = (targetLogical) => {
      const w = galleryItems[0]?.width || 1;
      const currentSnap = Math.round(scroll.target / w);
      const count = items.length;
      const currentMod = ((currentSnap % count) + count) % count;
      let diff = targetLogical - currentMod;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      scroll.target = (currentSnap + diff) * w;
      if (reducedMotion) {
        scroll.current = scroll.target;
      }
      scheduleRender();
    };

    stepRef.current = { stepBy, goToLogicalIndex };

    const handleResize = () => {
      const wBefore = galleryItems[0]?.width || 1;
      const currentIndexFloat = scroll.target / wBefore;
      ({ screen, viewport, bend } = getScreenAndViewport());
      galleryItems.forEach((gi) => gi.onResize({ screen, viewport, bend }));
      const wAfter = galleryItems[0]?.width || 1;
      scroll.target = Math.round(currentIndexFloat) * wAfter;
      scroll.current = scroll.target;
      scroll.last = scroll.target;
      publishCenterMetrics();
      scheduleRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          scheduleRender();
        } else if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onPointerDown = (e) => {
      if (e.button !== undefined && e.button !== 0 && e.pointerType === "mouse") return;
      const mobileMouse = isMobileViewport() && e.pointerType === "mouse";
      pointerDown = true;
      isDragging = false;
      allowDrag = !mobileMouse;
      activePointerId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      scrollAtStart = scroll.current;
      dragDistance = 0;
      if (!isMobileViewport() && e.pointerType === "mouse") {
        container.style.cursor = "grabbing";
      }
    };

    const onPointerMove = (e) => {
      if (!pointerDown || e.pointerId !== activePointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!allowDrag) {
        dragDistance = Math.max(dragDistance, Math.hypot(dx, dy));
        return;
      }

      if (!isDragging) {
        if (Math.abs(dx) > 8 && Math.abs(dx) >= Math.abs(dy) * 1.05) {
          isDragging = true;
          onDragStartRef.current?.();
          try {
            gl.canvas.setPointerCapture(e.pointerId);
          } catch {
            // Ignore capture errors on synthetic events
          }
        } else if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx) && e.pointerType === "touch") {
          pointerDown = false;
          return;
        } else {
          return;
        }
      }

      dragDistance = Math.max(dragDistance, Math.hypot(dx, dy));
      const dragScale = (viewport.width / screen.width) * 1.35;
      scroll.target = scrollAtStart - dx * dragScale;
      if (reducedMotion) {
        scroll.current = scroll.target;
      }
      scheduleRender();
    };

    const onPointerUp = (e) => {
      if (!pointerDown || e.pointerId !== activePointerId) return;
      pointerDown = false;
      if (!isMobileViewport() && e.pointerType === "mouse") {
        container.style.cursor = "grab";
      } else {
        container.style.cursor = "";
      }

      try {
        if (gl.canvas.hasPointerCapture(e.pointerId)) {
          gl.canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore release errors
      }

      const totalMove = Math.hypot(e.clientX - startX, e.clientY - startY);

      if (isDragging) {
        lastDragEndTime = performance.now();
        snapToNearest();
      } else if (
        dragDistance < 6 &&
        totalMove < 8 &&
        performance.now() - lastDragEndTime > 120
      ) {
        // Distinguish center card click (toggle overlay) vs side card click (center that card)
        const rect = gl.canvas.getBoundingClientRect();
        const clickWorldX = ((e.clientX - rect.left) / rect.width - 0.5) * viewport.width;
        const clickWorldY = (0.5 - (e.clientY - rect.top) / rect.height) * viewport.height;
        const w = galleryItems[0]?.width || 1;
        const baseHalfW = (galleryItems[0]?.planeBaseWidth || 1) * 0.54;
        const baseHalfH = (galleryItems[0]?.planeBaseHeight || 1) * 0.56;

        // Check if click landed on any visible gallery card
        let hitItem = null;
        let minHitDist = Infinity;
        for (let i = 0; i < galleryItems.length; i += 1) {
          const gi = galleryItems[i];
          const dxCard = Math.abs(clickWorldX - gi.plane.position.x);
          const dyCard = Math.abs(clickWorldY - gi.plane.position.y);
          if (dxCard <= gi.plane.scale.x * 0.54 && dyCard <= gi.plane.scale.y * 0.54) {
            if (dxCard < minHitDist) {
              minHitDist = dxCard;
              hitItem = gi;
            }
          }
        }

        if (hitItem) {
          const stepsFromCenter = Math.round(hitItem.plane.position.x / w);
          if (stepsFromCenter === 0) {
            onCenterClickRef.current?.();
          } else {
            onDragStartRef.current?.();
            stepBy(stepsFromCenter);
          }
        } else if (
          Math.abs(clickWorldX) <= baseHalfW &&
          Math.abs(clickWorldY - 0.45) <= baseHalfH
        ) {
          onCenterClickRef.current?.();
        } else if (clickWorldX > baseHalfW) {
          onDragStartRef.current?.();
          stepBy(1);
        } else if (clickWorldX < -baseHalfW) {
          onDragStartRef.current?.();
          stepBy(-1);
        }
      }
      isDragging = false;
      allowDrag = false;
    };

    const onWheel = (e) => {
      if (isMobileViewport()) return;
      // Only respond to explicit horizontal trackpad gestures so vertical page scroll is never trapped
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 4) {
        e.preventDefault();
        onDragStartRef.current?.();
        const wheelScale = (viewport.width / screen.width) * 0.65;
        scroll.target += e.deltaX * wheelScale;
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(snapToNearest, 140);
        scheduleRender();
      }
    };
    let wheelTimer;

    gl.canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    gl.canvas.addEventListener("wheel", onWheel, { passive: false });

    function update() {
      rafId = null;
      if (!isVisible) return;

      const ease = reducedMotion ? 1 : scroll.ease;
      scroll.current = lerp(scroll.current, scroll.target, ease);
      const diff = Math.abs(scroll.target - scroll.current);

      if (diff < 0.0006 && !pointerDown) {
        scroll.current = scroll.target;
      }

      const direction = scroll.current >= scroll.last ? "right" : "left";
      let closestDist = Infinity;
      let closestLogical = lastReportedIndex;

      for (let i = 0; i < galleryItems.length; i += 1) {
        const result = galleryItems[i].update(scroll, direction);
        if (result.x < closestDist) {
          closestDist = result.x;
          closestLogical = result.logicalIndex;
        }
      }

      if (closestLogical !== lastReportedIndex) {
        lastReportedIndex = closestLogical;
        onActiveChangeRef.current?.(closestLogical);
      }

      renderer.render({ scene, camera });
      scroll.last = scroll.current;

      if (diff >= 0.0006 || pointerDown || needsRender) {
        needsRender = false;
        if (diff >= 0.0006 || pointerDown) {
          rafId = requestAnimationFrame(update);
        }
      }
    }

    scheduleRender();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(wheelTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      gl.canvas.removeEventListener("wheel", onWheel);
      galleryItems.forEach((gi) => gi.dispose());
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
    // Intentionally re-init only when items signature or reducedMotion changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[350px] sm:h-[400px] lg:h-[450px] overflow-x-clip touch-pan-y overscroll-x-contain cursor-default sm:cursor-grab select-none"
    />
  );
}

export function HomeEmpowerment() {
  const [features, setFeatures] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [centerMetrics, setCenterMetrics] = useState({
    width: 310,
    height: 325,
    offsetY: -12,
    radius: 20,
  });
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const galleryStepRef = useRef({
    stepBy: () => {},
    goToLogicalIndex: () => {},
  });
  const overlaySwipeStartRef = useRef(null);

  useEffect(() => {
    const loadData = () => {
      const data = dataService.getEmpowerment();
      setFeatures(Array.isArray(data) ? data : []);
    };
    loadData();

    window.addEventListener("sherize_data_updated", loadData);
    return () => window.removeEventListener("sherize_data_updated", loadData);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (features.length > 0 && activeIndex >= features.length) {
      setActiveIndex(0);
      setIsDetailOpen(false);
    }
  }, [features.length, activeIndex]);

  const galleryItems = useMemo(
    () =>
      features.map((feature, index) => ({
        id: feature.id || String(index),
        title: feature.title,
        desc: feature.desc,
        image: resolveFeatureImage(feature, index),
      })),
    [features],
  );

  const handleActiveChange = useCallback((nextIndex) => {
    setActiveIndex(nextIndex);
    setIsDetailOpen(false);
  }, []);

  const handleCenterClick = useCallback(() => {
    setIsDetailOpen((prev) => !prev);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDetailOpen(false);
  }, []);

  const handlePrev = useCallback(() => {
    setIsDetailOpen(false);
    galleryStepRef.current.stepBy(-1);
  }, []);

  const handleNext = useCallback(() => {
    setIsDetailOpen(false);
    galleryStepRef.current.stepBy(1);
  }, []);

  const handleSelectFeature = useCallback((index) => {
    setIsDetailOpen(false);
    galleryStepRef.current.goToLogicalIndex(index);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        handleSelectFeature(0);
      } else if (e.key === "End" && features.length > 0) {
        e.preventDefault();
        handleSelectFeature(features.length - 1);
      } else if (e.key === "Escape") {
        setIsDetailOpen(false);
      } else if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
        e.preventDefault();
        setIsDetailOpen((prev) => !prev);
      }
    },
    [features.length, handleNext, handlePrev, handleSelectFeature],
  );

  const handleOverlayPointerDown = useCallback((e) => {
    overlaySwipeStartRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleOverlayPointerMove = useCallback((e) => {
    const start = overlaySwipeStartRef.current;
    if (!start) return;
    const dx = Math.abs(e.clientX - start.x);
    const dy = Math.abs(e.clientY - start.y);
    if (dx > 18 && dx > dy * 1.25) {
      overlaySwipeStartRef.current = null;
      setIsDetailOpen(false);
    }
  }, []);

  const handleOverlayPointerEnd = useCallback(() => {
    overlaySwipeStartRef.current = null;
  }, []);

  if (!features || features.length === 0) return null;

  const safeIndex = activeIndex % features.length;
  const activeFeature = features[safeIndex];
  const ActiveIcon = iconsMap[safeIndex % iconsMap.length];

  return (
    <section
      id="opportunities"
      className="relative py-20 sm:py-24 overflow-x-clip bg-[#FAF9F6] border-y border-[rgba(16,29,43,0.06)]"
    >
      {/* Subtle Sherize ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[540px] w-full max-w-[760px] rounded-full bg-[#167D8D]/[0.05] blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-0 bottom-0 h-[360px] w-72 sm:w-[360px] rounded-full bg-[#D6A35B]/[0.06] blur-[110px] pointer-events-none"
      />

      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Heading */}
        <Reveal className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-6">
            <span className="h-px w-12 bg-[#D6A35B]/50" />
            Empowerment
            <span className="h-px w-12 bg-[#D6A35B]/50" />
          </span>
          <KineticHeading
            as="h2"
            className="text-[2rem] sm:text-5xl lg:text-6xl font-display font-semibold tracking-tighter leading-[1.05] text-black"
          >
            Empowering <span className="text-gradient">Women</span> Through Sherize
          </KineticHeading>
        </Reveal>

        {/* Interactive 3D Circular Gallery */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Empowering Women Through Sherize"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="relative overflow-x-clip touch-pan-y overscroll-x-contain outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D]/40 rounded-3xl"
        >
          {/* Side Edge Fades for Cinematic Circular Depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 z-10 bg-gradient-to-r from-[#FAF9F6] via-[#FAF9F6]/65 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 z-10 bg-gradient-to-l from-[#FAF9F6] via-[#FAF9F6]/65 to-transparent"
          />

          <CircularGalleryCanvas
            items={galleryItems}
            activeIndex={safeIndex}
            onActiveChange={handleActiveChange}
            onCenterClick={handleCenterClick}
            onDragStart={handleDragStart}
            onCenterMetricsChange={setCenterMetrics}
            reducedMotion={reducedMotion}
            stepRef={galleryStepRef}
          />

          {/* Center Card Interactive Indicator & Translucent Glass Description Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div
              className="relative overflow-hidden"
              style={{
                width: `${centerMetrics.width}px`,
                height: `${centerMetrics.height}px`,
                transform: `translateY(${centerMetrics.offsetY}px)`,
                borderRadius: `${centerMetrics.radius}px`,
              }}
            >
              {/* Subtle "Click to Explore" Indicator on Active Card */}
              <AnimatePresence>
                {!isDetailOpen && (
                  <motion.div
                    key={`explore-${safeIndex}`}
                    initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                    className="absolute inset-x-0 bottom-3.5 sm:bottom-4 flex justify-center px-3"
                  >
                    <button
                      type="button"
                      onClick={() => setIsDetailOpen(true)}
                      aria-expanded={isDetailOpen}
                      aria-label={`Explore ${activeFeature.title}`}
                      className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#101D2B]/70 px-3.5 py-1.5 text-[11px] sm:text-xs font-medium tracking-wide text-white/95 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:bg-[#101D2B]/85 hover:border-[#D6A35B]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A35B] sm:cursor-pointer"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D6A35B]" />
                      Click to Explore
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dark Navy Translucent Glass Overlay */}
              <AnimatePresence>
                {isDetailOpen && (
                  <motion.div
                    key={`overlay-${activeFeature.id || activeFeature.title || safeIndex}`}
                    role="dialog"
                    aria-label={activeFeature.title}
                    initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.42,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onPointerDown={handleOverlayPointerDown}
                    onPointerMove={handleOverlayPointerMove}
                    onPointerUp={handleOverlayPointerEnd}
                    onPointerCancel={handleOverlayPointerEnd}
                    className="pointer-events-auto touch-pan-y absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#101D2B]/88 via-[#101D2B]/72 to-[#101D2B]/55 backdrop-blur-[6px] border border-[#D6A35B]/35 p-3.5 sm:p-6 text-white shadow-2xl overflow-y-auto"
                    style={{ borderRadius: `${centerMetrics.radius}px` }}
                  >
                    {/* Top Row: Category Icon + Index + Close Button */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 sm:gap-2.5">
                        <span className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#D6A35B]/15 text-[#D6A35B] border border-[#D6A35B]/35">
                          <ActiveIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </span>
                        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#D6A35B]">
                          {String(safeIndex + 1).padStart(2, "0")} /{" "}
                          {String(features.length).padStart(2, "0")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsDetailOpen(false)}
                        aria-label="Close description overlay"
                        className="grid h-7 w-7 sm:h-8 sm:w-8 shrink-0 place-items-center rounded-full bg-white/10 text-white/90 border border-white/15 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A35B] sm:cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>

                    {/* Bottom Content: Gold Accent + Title + Description */}
                    <div className="mt-2 sm:mt-3 pt-1 sm:pt-2">
                      <span className="block h-0.5 w-8 sm:w-10 rounded-full bg-[#D6A35B] mb-2 sm:mb-3" />
                      <h3 className="text-base sm:text-2xl font-display font-semibold tracking-tight text-white leading-snug">
                        {activeFeature.title}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-[11.5px] sm:text-sm md:text-[15px] text-white/90 leading-relaxed font-light">
                        {activeFeature.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Side Arrow Controls (Vertically centered on active card, same horizontal line) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous empowerment card"
            style={{ top: `calc(50% + ${centerMetrics.offsetY}px)` }}
            className="sm:hidden grid place-items-center absolute left-0.5 -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-white/95 border border-[rgba(16,29,43,0.14)] text-[#101D2B] shadow-md backdrop-blur-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next empowerment card"
            style={{ top: `calc(50% + ${centerMetrics.offsetY}px)` }}
            className="sm:hidden grid place-items-center absolute right-0.5 -translate-y-1/2 z-30 h-8 w-8 rounded-full bg-white/95 border border-[rgba(16,29,43,0.14)] text-[#101D2B] shadow-md backdrop-blur-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Floating Desktop Arrow Controls */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous empowerment card"
            className="hidden sm:grid place-items-center absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/95 border border-[rgba(16,29,43,0.12)] text-[#101D2B] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#167D8D] hover:text-[#167D8D] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D] cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next empowerment card"
            className="hidden sm:grid place-items-center absolute right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 h-11 w-11 rounded-full bg-white/95 border border-[rgba(16,29,43,0.12)] text-[#101D2B] shadow-md backdrop-blur-md transition-all duration-300 hover:border-[#167D8D] hover:text-[#167D8D] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#167D8D] cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Category Navigation Buttons (2-column centered grid on mobile, flex row on desktop) */}
        <div className="mt-4 flex justify-center">
          <div
            className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 w-full max-w-[340px] sm:w-auto sm:max-w-none"
            role="tablist"
            aria-label="Select empowerment highlight"
          >
            {features.map((feature, index) => {
              const isSelected = index === safeIndex;
              return (
                <button
                  key={feature.id || feature.title || index}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectFeature(index)}
                  className={`px-2.5 py-2 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-medium text-center leading-tight transition-all duration-300 border sm:cursor-pointer ${
                    isSelected
                      ? "bg-[#101D2B] text-white border-[#101D2B] shadow-sm"
                      : "bg-white/80 text-[#4F789E] border-[rgba(16,29,43,0.1)] hover:border-[#167D8D]/40 hover:text-[#101D2B]"
                  }`}
                >
                  {feature.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Retained Tagline */}
        <p className="mt-6 text-center text-xs sm:text-sm text-[#4F789E]">
          <span className="font-semibold uppercase tracking-[0.18em] text-[#167D8D]">
            Join The Movement
          </span>
          <span className="mx-2 text-[#D6A35B]" aria-hidden>
            —
          </span>
          <span className="font-medium text-[#101D2B]">
            Women-led, world-class community.
          </span>
        </p>
      </div>
    </section>
  );
}
