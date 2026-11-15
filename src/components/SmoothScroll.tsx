"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";

// Resets scroll position to top whenever route changes
function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (!target) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    // Images and 3D scenes above the section change the page height while
    // loading, so scroll once now and correct the position after they settle.
    const first = setTimeout(() => lenis.scrollTo(target, { offset: -90 }), 100);
    const settle = setTimeout(() => {
      const off = target.getBoundingClientRect().top - 90;
      if (Math.abs(off) > 40) lenis.scrollTo(target, { offset: -90, immediate: true });
    }, 1400);
    return () => {
      clearTimeout(first);
      clearTimeout(settle);
    };
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        infinite: false,
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
