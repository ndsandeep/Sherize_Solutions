import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenisRef, ScrollTrigger } from "@/lib/motion";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    // New page = new height: let GSAP re-measure its triggers once the content has mounted.
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
