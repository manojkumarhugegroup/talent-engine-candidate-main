import React, { useRef, useState, useEffect, ReactNode } from "react";

interface ScrollableShadowBoxProps {
  children: ReactNode;
  className?: string; // optional custom styling
}

const ScrollableShadowBox: React.FC<ScrollableShadowBoxProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shadows, setShadows] = useState({ top: false, bottom: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateShadows = () => {
      setShadows({
        top: el.scrollTop > 0,
        bottom: el.scrollTop + el.clientHeight < el.scrollHeight,
      });
    };

    el.addEventListener("scroll", updateShadows);
    updateShadows(); // initial check

    return () => {
      el.removeEventListener("scroll", updateShadows);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* top shadow */}
      {shadows.top && (
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-background to-transparent z-10" />
      )}

      {/* scrollable content */}
      <div ref={ref} className="overflow-y-auto no-scrollbar">
        {children}
      </div>

      {/* bottom shadow */}
      {shadows.bottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent z-10" />
      )}
    </div>
  );
};

export default ScrollableShadowBox;
