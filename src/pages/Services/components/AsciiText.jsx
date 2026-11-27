import { useEffect, useRef, useState } from "react";

const ASCII_CHARS = "@#$%&*+=?/<>[]{}~^01";

/**
 * React Bits style AsciiText component.
 * Decodes text through ASCII glyphs on scroll-into-view and on hover.
 */
export function AsciiText({
  text = "",
  className = "",
  speed = 32,
  revealStep = 0.45,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const triggerAscii = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          })
          .join("")
      );

      iteration += revealStep;
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          setHasPlayed(true);
          triggerAscii();
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, hasPlayed]);

  return (
    <span
      ref={ref}
      onMouseEnter={triggerAscii}
      className={`services-ascii-heading ${className}`}
      aria-label={text}
    >
      {displayText}
    </span>
  );
}
