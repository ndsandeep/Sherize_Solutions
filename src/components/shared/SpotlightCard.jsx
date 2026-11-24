/**
 * Cursor-following spotlight card, in the style of React Bits' "SpotlightCard".
 * Implemented locally (no dependency). Spotlight only on hover; pointer-only.
 */
export function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={onMove} className={`spot ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
