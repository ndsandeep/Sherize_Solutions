/**
 * React Bits style ShinyText component.
 * Renders text with a continuous animated metallic shine sweep.
 */
export function ShinyText({
  text = "",
  className = "",
  speed = 3.2,
  disabled = false,
}) {
  return (
    <span
      className={`careers-shiny-text ${disabled ? "is-disabled" : ""} ${className}`}
      style={{ "--shiny-speed": `${speed}s` }}
    >
      {text}
    </span>
  );
}
