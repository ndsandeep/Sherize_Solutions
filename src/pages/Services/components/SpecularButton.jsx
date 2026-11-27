import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * SpecularButton component.
 * Features a dynamic cursor-following specular light reflection and glass sheen.
 */
export function SpecularButton({
  to = "/contact",
  label = "Book a Call",
  className = "",
}) {
  const btnRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <Link
      ref={btnRef}
      to={to}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`services-specular-btn ${className}`}
      style={{
        "--spec-x": `${coords.x}%`,
        "--spec-y": `${coords.y}%`,
        "--spec-opacity": isHovered ? 1 : 0,
      }}
    >
      <span className="services-specular-glow" aria-hidden="true" />
      <span className="services-specular-sheen" aria-hidden="true" />
      <span className="services-specular-content">
        <span>{label}</span>
        <ArrowRight className="h-4 w-4 services-specular-icon" />
      </span>
    </Link>
  );
}
