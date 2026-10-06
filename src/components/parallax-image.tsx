import { useEffect, useRef } from "react";

export function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const parent = image.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const offset = Math.max(-42, Math.min(42, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08));
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);

  return <img ref={imageRef} src={src} alt={alt} className={`will-change-transform ${className}`} />;
}