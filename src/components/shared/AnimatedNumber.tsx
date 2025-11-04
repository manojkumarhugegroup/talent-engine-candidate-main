"use client"

import React, { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number | string;
  duration?: number; // animation duration in ms
  decimals?: number; // number of decimal places
  easing?: "linear" | "easeIn" | "easeOut" | "easeInOut" | "bounce"; // easing functions
  format?: boolean; // whether to format the number with commas
  className?: string; // additional styling
  delay?: number; // delay before animation starts
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  decimals = 0,
  easing = "easeOut",
  format = false,
  className = "",
  delay = 0,
}) => {
  const targetValue = Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(targetValue);
  const isFirstRender = useRef(true);

  // Easing functions
  const easingFunctions = {
    linear: (t: number) => t,
    easeIn: (t: number) => t * t,
    easeOut: (t: number) => t * (2 - t),
    easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    bounce: (t: number) => {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      } else if (t < 2 / 2.75) {
        return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
      } else if (t < 2.5 / 2.75) {
        return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
      } else {
        return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
      }
    },
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (isFirstRender.current) {
      // Set initial value immediately on first render
      setDisplayValue(targetValue);
      prevValueRef.current = targetValue;
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      let start: number | null = null;
      const startValue = prevValueRef.current;
      const change = targetValue - startValue;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Apply easing
        const easedPercentage = easingFunctions[easing](percentage);
        
        const currentValue = startValue + change * easedPercentage;
        setDisplayValue(parseFloat(currentValue.toFixed(decimals)));

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          prevValueRef.current = targetValue;
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetValue, duration, decimals, easing, delay]);

  return (
    <span className={className}>
      {format ? formatNumber(displayValue) : displayValue.toFixed(decimals)}
    </span>
  );
};