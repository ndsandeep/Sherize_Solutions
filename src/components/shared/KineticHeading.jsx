import { cloneElement, isValidElement, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";

/** Plain-text version of the heading, used for screen readers. */
function toPlain(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlain).join("");
  if (isValidElement(node)) {
    if (node.type === "br") return " ";
    return toPlain(node.props.children);
  }
  return "";
}

/**
 * Walks the heading's children and wraps every word in a masked span.
 * Elements (<span className="text-gradient">, <br/>) are cloned so existing markup and
 * colours are preserved; the gradient class moves onto each word so it survives transforms.
 */
function split(node, gradient = false, key = "k") {
  if (node == null || typeof node === "boolean") return null;
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
      .split(/(\s+)/)
      .filter((part) => part !== "")
      .map((part, i) =>
        /^\s+$/.test(part) ? (
          part
        ) : (
          <span key={`${key}-${i}`} className="kw">
            <span className={`kw-i${gradient ? " text-gradient" : ""}`}>{part}</span>
          </span>
        ),
      );
  }
  if (Array.isArray(node)) return node.map((n, i) => split(n, gradient, `${key}-${i}`));
  if (isValidElement(node)) {
    if (node.type === "br") return cloneElement(node, { key });
    const cls = node.props.className || "";
    const isGrad = gradient || /\btext-gradient\b/.test(cls);
    const cleaned = cls.replace(/\btext-gradient\b/g, "").trim();
    return cloneElement(node, { key, className: cleaned }, split(node.props.children, isGrad, key));
  }
  return node;
}

/**
 * Kinetic headline: words rise out of a mask with a slight skew, staggered, once, when
 * the heading scrolls into view. Honors prefers-reduced-motion (renders plain text).
 */
export function KineticHeading({ as: Tag = "h1", className = "", children, delay = 0 }) {
  const ref = useRef(null);
  const label = toPlain(children).replace(/\s+/g, " ").trim();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll(".kw-i");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115, skewY: 7, opacity: 0 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () =>
          gsap.to(words, {
            yPercent: 0,
            skewY: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: 0.06,
            delay,
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [label, delay]);

  return (
    <Tag ref={ref} className={className} aria-label={label}>
      <span aria-hidden="true">{split(children)}</span>
    </Tag>
  );
}
