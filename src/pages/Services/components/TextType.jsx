import { useEffect, useRef, useState } from "react";

/**
 * React Bits style TextType component.
 * Types out text character by character with a blinking cursor.
 * Supports `startOnView` for sections below the fold.
 */
export function TextType({
  text = "",
  className = "",
  typingSpeed = 22,
  initialDelay = 750,
  showCursor = true,
  cursorCharacter = "|",
  startOnView = false,
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [inView, setInView] = useState(!startOnView);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!startOnView) {
      setInView(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!inView) return;
    setDisplayedLength(0);
    setStarted(false);

    const startTimer = setTimeout(() => {
      setStarted(true);
    }, initialDelay);

    return () => clearTimeout(startTimer);
  }, [inView, text, initialDelay]);

  useEffect(() => {
    if (!started || displayedLength >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [started, displayedLength, text, typingSpeed]);

  const isComplete = displayedLength >= text.length;

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, displayedLength)}</span>
      {showCursor && (
        <span
          aria-hidden="true"
          className={`services-type-cursor ${isComplete ? "services-type-cursor-blink" : ""}`}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
