import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones } from "lucide-react";

const ICONS_MAP = [Globe, Code2, Smartphone, Palette, Megaphone, PhoneCall, Headphones];

function toSlug(text = "") {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getServiceRoute(title = "") {
  const t = title.toLowerCase();
  if (t.includes("website")) return "/services/website-development";
  if (t.includes("web app") || t.includes("application")) return "/services/application-development";
  if (t.includes("mobile")) return "/services/mobile-app-development";
  if (t.includes("ui/ux") || t.includes("design")) return "/services/ui-ux-design-company";
  if (t.includes("marketing")) return "/services/digital-marketing-services";
  return `/services?service=${toSlug(title)}`;
}

/**
 * React Bits style CircularGallery component.
 * Renders cards along an interactive curved circular arc with drag, wheel, and click-to-redirect.
 */
export function CircularGallery({
  items = [],
  bend = 2.4,
  autoPlay = true,
}) {
  const navigate = useNavigate();
  const [activeFloat, setActiveFloat] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dragStartX = useRef(0);
  const dragStartFloat = useRef(0);
  const hasDragged = useRef(false);
  const targetFloat = useRef(0);
  const currentFloat = useRef(0);
  const rafRef = useRef(null);

  const count = items.length;

  // Smooth spring/lerp animation loop
  useEffect(() => {
    if (count === 0) return;

    let lastTime = performance.now();
    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (autoPlay && !isDragging && !isHovered) {
        targetFloat.current += dt * 0.28;
      }

      currentFloat.current += (targetFloat.current - currentFloat.current) * 0.1;
      setActiveFloat(currentFloat.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count, autoPlay, isDragging, isHovered]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartFloat.current = targetFloat.current;
    hasDragged.current = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 6) {
      hasDragged.current = true;
    }
    targetFloat.current = dragStartFloat.current - dx / 260;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleStep = (dir) => {
    targetFloat.current = Math.round(targetFloat.current) + dir;
  };

  const handleCardClick = (item) => {
    if (hasDragged.current) return;
    navigate(getServiceRoute(item.title));
  };

  if (count === 0) return null;

  return (
    <div
      className="services-circular-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Curved Circular Stage */}
      <div className="services-circular-stage">
        {items.map((item, i) => {
          const Icon = ICONS_MAP[i % ICONS_MAP.length];

          // Wrap index smoothly around [-count/2, count/2]
          let offset = (i - activeFloat) % count;
          if (offset > count / 2) offset -= count;
          if (offset < -count / 2) offset += count;

          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 3.1;
          if (!isVisible) return null;

          // Circular arc math: horizontal spread, vertical bend drop, and gentle tilt
          const translateX = offset * 290;
          const translateY = Math.pow(offset, 2) * (bend * 10);
          const rotateZ = offset * 6.5;
          const scale = Math.max(0.72, 1 - absOffset * 0.11);
          const opacity = Math.max(0.15, 1 - absOffset * 0.26);
          const zIndex = Math.round(50 - absOffset * 10);

          return (
            <div
              key={item.id || item.title}
              onClick={() => handleCardClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(getServiceRoute(item.title));
                }
              }}
              className={`services-circular-card ${absOffset < 0.45 ? "is-center" : ""}`}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotateZ}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                draggable={false}
                className="services-circular-card-img"
              />
              <div className="services-circular-card-overlay" />

              <div className="services-circular-card-body">
                <div className="services-circular-card-icon">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="services-circular-card-title">{item.title}</h3>
                <p className="services-circular-card-desc">{item.desc}</p>
                <span className="services-circular-card-link">
                  Explore Service <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="services-circular-controls">
        <button
          type="button"
          onClick={() => handleStep(-1)}
          aria-label="Previous service"
          className="services-circular-nav-btn"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="services-circular-hint">Drag or click any service</span>
        <button
          type="button"
          onClick={() => handleStep(1)}
          aria-label="Next service"
          className="services-circular-nav-btn"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
