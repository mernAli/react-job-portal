// src/components/ui/PageWrapper.jsx
import React, { useEffect, useRef } from "react";

const PageWrapper = ({ children }) => {
  return <>{children}</>;
};

export const usePageTransition = () => {
  const targetRef = useRef(null);

  useEffect(() => {
    if (targetRef.current) {
      // 1. Prepare hardware acceleration and layout weight properties
      targetRef.current.style.opacity = "0";
      // Starting slightly lower (24px) gives a deeper, more elegant sweep upwards
      targetRef.current.style.transform = "translateY(24px) scale(0.99)";
      targetRef.current.style.willChange = "transform, opacity";

      // 2. Execute the ultra-fluid organic spring animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (targetRef.current) {
            targetRef.current.animate(
              [
                { 
                  opacity: 0, 
                  transform: "translateY(24px) scale(0.99)" 
                },
                { 
                  opacity: 0.4,
                  transform: "translateY(6px) scale(0.998)" // Midpoint acceleration tracking
                },
                { 
                  opacity: 1, 
                  transform: "translateY(0) scale(1)" 
                }
              ],
              {
                duration: 550, // 550ms is the sweet spot for luxury/premium application transitions
                // This custom curve mimics a highly dampened physical spring (fast launch, soft elastic float, buttery settle)
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", 
                fill: "forwards"
              }
            );
          }
        });
      });
    }
  }, []);

  return targetRef;
};

export default PageWrapper;