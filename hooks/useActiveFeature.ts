"use client";

import { useState, useCallback } from "react";

export function useActiveFeature(initialIndex = 0) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const handleFeatureHover = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleAccordionToggle = useCallback((index: number) => {
    // If we want it to be toggleable, we can allow null, but to match hover state exactly
    // we just set it as active
    setActiveIndex(index);
  }, []);

  return {
    activeIndex,
    handleFeatureHover,
    handleAccordionToggle,
  };
}
