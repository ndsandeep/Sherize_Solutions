import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import aboutHeroImg from "@/assets/images/about_hero.jpg";
import { Parallax } from "@/components/shared/Parallax";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const HEADING_LINES = [
  { words: ["Where", "Women", "Grow,"], gradient: false },
  { words: ["Work", "&", "Build", "the"], gradient: false },
  { words: ["Future", "Digitally"], gradient: true },
];

const DESCRIPTION_TEXT =
  "Sherize Solutions Private Limited is an IT and digital solutions company that empowers businesses with innovative technology, while creating flexible work opportunities for women to earn, learn, and lead.";

const LIGHT_RAYS_VERT = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const LIGHT_RAYS_FRAG = /* glsl */ `
  precision highp float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 rayPos;
  uniform vec2 rayDir;
  uniform vec3 tealColor;
  uniform vec3 goldColor;
  uniform float raysSpeed;
  uniform float lightSpread;
  uniform float rayLength;
  uniform float fadeDistance;
  uniform float intensity;
  uniform vec2 mousePos;
  uniform float mouseInfluence;

  varying vec2 vUv;

  float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
    vec2 sourceToCoord = coord - raySource;
    float distance = length(sourceToCoord);
    vec2 dirNorm = sourceToCoord / max(distance, 0.0001);

    float cosAngle = dot(dirNorm, rayRefDirection);
    float spreadFactor = pow(max(cosAngle, 0.0), 1.0 / max(lightSpread, 0.05));

    float maxDistance = iResolution.x * rayLength;
    float lengthFalloff = clamp((maxDistance - distance) / max(maxDistance, 1.0), 0.0, 1.0);
    float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / max(iResolution.x * fadeDistance, 1.0), 0.35, 1.0);

    float base1 = sin(cosAngle * seedA + iTime * speed) * 0.5 + 0.5;
    float base2 = cos(-cosAngle * seedB + iTime * speed * 0.8) * 0.5 + 0.5;

    float beam = clamp(0.42 + 0.58 * (0.55 * base1 + 0.45 * base2), 0.0, 1.0);
    return spreadFactor * lengthFalloff * fadeFalloff * beam;
  }

  void main() {
    vec2 coord = vec2(gl_FragCoord.x, gl_FragCoord.y);

    vec2 finalRayDir = rayDir;
    if (mouseInfluence > 0.0) {
      vec2 mouseScreenPos = vec2(mousePos.x * iResolution.x, (1.0 - mousePos.y) * iResolution.y);
      vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
      finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
    }

    float r1 = rayStrength(rayPos, finalRayDir, coord, 34.2, 21.4, 1.15 * raysSpeed);
    float r2 = rayStrength(rayPos, finalRayDir, coord, 22.8, 13.7, 0.85 * raysSpeed);
    float combined = r1 * 0.58 + r2 * 0.42;

    // Soft vertical attenuation so center text stays crisp and readable
    float topBoost = smoothstep(0.12, 0.95, vUv.y);
    float centerGuard = 1.0 - smoothstep(0.0, 0.48, abs(vUv.x - 0.5)) * 0.16;

    // Blend subtle teal rays with a warm gold accent near the top center core
    float goldMix = smoothstep(0.32, 0.92, combined) * smoothstep(0.35, 1.0, vUv.y);
    vec3 rayColor = mix(tealColor, goldColor, goldMix * 0.48);

    float alpha = clamp(combined * topBoost * centerGuard * intensity, 0.0, 0.78);
    gl_FragColor = vec4(rayColor * alpha, alpha);
  }
`;

function LightRaysCanvas({ isMobile, reducedMotion, desktopPointer }) {
  const containerRef = useRef(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    if (reducedMotion) {
      return undefined;
    }

    let renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
      });
    } catch {
      setWebglUnavailable(true);
      return undefined;
    }

    const gl = renderer.gl;
    if (!gl) {
      setWebglUnavailable(true);
      return undefined;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";
    gl.canvas.style.pointerEvents = "none";
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] },
      rayPos: { value: [0.5, 1] },
      rayDir: { value: [0, -1] },
      tealColor: { value: [0.086, 0.49, 0.553] }, // #167D8D
      goldColor: { value: [0.839, 0.639, 0.357] }, // #D6A35B
      raysSpeed: { value: isMobile ? 0.45 : 0.65 },
      lightSpread: { value: isMobile ? 0.65 : 0.85 },
      rayLength: { value: isMobile ? 1.35 : 1.5 },
      fadeDistance: { value: 1.05 },
      intensity: { value: isMobile ? 0.42 : 0.62 },
      mousePos: { value: [0.5, 0.35] },
      mouseInfluence: { value: desktopPointer ? 0.14 : 0 },
    };

    const program = new Program(gl, {
      vertex: LIGHT_RAYS_VERT,
      fragment: LIGHT_RAYS_FRAG,
      uniforms,
      transparent: true,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const targetMouse = { x: 0.5, y: 0.35 };
    const smoothMouse = { x: 0.5, y: 0.35 };

    const updateSize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      renderer.setSize(w, h);
      const cw = gl.canvas.width;
      const ch = gl.canvas.height;
      uniforms.iResolution.value = [cw, ch];
      // Origin at top-center (GL y=ch is top edge) pointing straight down
      uniforms.rayPos.value = [cw * 0.5, ch * 1.16];
      uniforms.rayDir.value = [0, -1];
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    let isVisible = true;
    let rafId = null;

    const tick = (t) => {
      rafId = null;
      if (!isVisible) return;

      uniforms.iTime.value = t * 0.001;
      if (desktopPointer) {
        smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.06;
        smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.06;
        uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
      }

      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!rafId && isVisible && !document.hidden) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 },
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMouseMove = (e) => {
      if (!desktopPointer) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetMouse.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      targetMouse.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    };

    if (desktopPointer) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (desktopPointer) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [desktopPointer, isMobile, reducedMotion]);

  if (reducedMotion || webglUnavailable) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(65% 58% at 50% 0%, rgba(214, 163, 91, 0.22) 0%, rgba(22, 125, 141, 0.26) 40%, transparent 78%)",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] mix-blend-screen"
    />
  );
}

export function AboutHero() {
  const sectionRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const [desktopPointer, setDesktopPointer] = useState(
    () =>
      typeof window !== "undefined" &&
      hasFinePointer() &&
      !prefersReducedMotion() &&
      window.innerWidth >= 768,
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rmQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fpQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      const rm = rmQuery.matches;
      const mobile = window.innerWidth < 768;
      setReducedMotion(rm);
      setIsMobile(mobile);
      setDesktopPointer(!rm && fpQuery.matches && !mobile);
    };

    update();
    rmQuery.addEventListener("change", update);
    fpQuery.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      rmQuery.removeEventListener("change", update);
      fpQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const indexedLines = useMemo(() => {
    let runningIndex = 0;
    return HEADING_LINES.map((line) => ({
      ...line,
      words: line.words.map((word) => {
        const idx = runningIndex;
        runningIndex += 1;
        return { word, idx };
      }),
    }));
  }, []);

  const totalWords = useMemo(
    () => HEADING_LINES.reduce((acc, line) => acc + line.words.length, 0),
    [],
  );

  const wordStagger = isMobile ? 0.045 : 0.065;
  const wordDuration = isMobile ? 0.5 : 0.68;
  const descriptionDelay = reducedMotion ? 0 : totalWords * wordStagger + 0.14;

  return (
    <section
      ref={sectionRef}
      className="relative pt-36 pb-20 sm:pt-48 sm:pb-32 overflow-x-clip min-h-[88vh] sm:min-h-[90vh] flex items-center bg-[#0D1B28]"
    >
      {/* Background Image with Dark Navy Readability Overlays */}
      {isMobile || reducedMotion ? (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={aboutHeroImg}
            alt="About Sherize"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-[#0D1B28]/74" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#0D1B28]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/80 via-transparent to-transparent" />
        </div>
      ) : (
        <Parallax className="absolute inset-0 z-0" amount={6}>
          <img
            src={aboutHeroImg}
            alt="About Sherize"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-[#0D1B28]/74" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101D2B] via-[#0D1B28]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D1B28]/80 via-transparent to-transparent" />
        </Parallax>
      )}

      {/* React Bits Light Rays (OGL WebGL with Static Fallback) */}
      <LightRaysCanvas
        isMobile={isMobile}
        reducedMotion={reducedMotion}
        desktopPointer={desktopPointer}
      />

      {/* Centered Content */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 mt-10 sm:mt-12">
        {/* Eyebrow */}
        <motion.span
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D6A35B] font-semibold mb-5 sm:mb-6 drop-shadow-md"
        >
          <span className="h-px w-8 sm:w-12 bg-[#D6A35B]/50" />
          ABOUT SHERIZE
          <span className="h-px w-8 sm:w-12 bg-[#D6A35B]/50" />
        </motion.span>

        {/* React Bits Blur Text Heading */}
        <h1
          aria-label="Where Women Grow, Work & Build the Future Digitally"
          className="text-3xl sm:text-5xl lg:text-[3.25rem] font-display font-semibold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-2xl"
        >
          <span aria-hidden="true">
            {indexedLines.map((line, lineIdx) => (
              <span key={lineIdx}>
                {lineIdx === 1 && <br className="hidden md:block" />}
                {line.words.map(({ word, idx }) => (
                  <span key={`${lineIdx}-${idx}`}>
                    <motion.span
                      initial={
                        reducedMotion
                          ? false
                          : { filter: "blur(10px)", opacity: 0, y: -14 }
                      }
                      animate={
                        hasEntered
                          ? reducedMotion
                            ? { opacity: 1 }
                            : {
                                filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
                                opacity: [0, 0.65, 1],
                                y: [-14, 2, 0],
                              }
                          : undefined
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : {
                              duration: wordDuration,
                              delay: idx * wordStagger,
                              ease: [0.22, 1, 0.36, 1],
                            }
                      }
                      className={`inline-block will-change-[transform,filter,opacity]${
                        line.gradient ? " text-gradient drop-shadow-2xl" : ""
                      }`}
                    >
                      {word}
                    </motion.span>
                    {idx < totalWords - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </span>
        </h1>

        {/* Description Reveal (Blur-to-Clear + Fade-Up after Heading) */}
        <motion.p
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          animate={
            hasEntered
              ? reducedMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, filter: "blur(0px)" }
              : undefined
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: isMobile ? 0.55 : 0.72,
                  delay: descriptionDelay,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="text-base sm:text-xl text-white/90 leading-relaxed font-light max-w-3xl mx-auto drop-shadow-lg px-1"
        >
          {DESCRIPTION_TEXT}
        </motion.p>
      </div>
    </section>
  );
}
