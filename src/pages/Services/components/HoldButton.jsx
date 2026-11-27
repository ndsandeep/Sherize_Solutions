import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

/**
 * React Bits style HoldButton component.
 * Press and hold to fill the progress bar and trigger `onComplete`.
 */
export function HoldButton({
  label = "Book a Call",
  holdDuration = 950,
  onComplete,
  className = "",
}) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const stopHold = () => {
    setIsHolding(false);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (!completed) {
      setProgress(0);
    }
  };

  const startHold = () => {
    if (completed) return;
    setIsHolding(true);
    startTimeRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startTimeRef.current;
      const nextProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        setCompleted(true);
        setIsHolding(false);
        if (onComplete) onComplete();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      onMouseDown={startHold}
      onMouseUp={stopHold}
      onMouseLeave={stopHold}
      onTouchStart={startHold}
      onTouchEnd={stopHold}
      onTouchCancel={stopHold}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isHolding) {
          e.preventDefault();
          startHold();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          stopHold();
        }
      }}
      className={`services-hold-btn ${isHolding ? "is-holding" : ""} ${
        completed ? "is-completed" : ""
      } ${className}`}
      aria-label={`${label} — press and hold to confirm`}
    >
      {/* Animated Hold Fill Layer */}
      <span
        className="services-hold-btn-fill"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      {/* Button Foreground Content */}
      <span className="services-hold-btn-content">
        <span>{completed ? "Opening..." : isHolding ? "Hold..." : label}</span>
        <ArrowRight className="h-4 w-4 services-hold-btn-icon" />
      </span>
    </button>
  );
}
