/**
 * useActiveSection.js — Project NOVA Custom Hook
 *
 * Tracks which section is currently in the viewport using IntersectionObserver.
 * Used by Navbar to highlight the active navigation item.
 *
 * DS Reference: DESIGN_SYSTEM.md §20 — Navigation System (Active Item)
 *
 * @param {string[]} sectionIds - Array of section element IDs to observe
 * @param {object}  [options]
 * @param {string}  [options.rootMargin]    - IntersectionObserver rootMargin
 * @returns {string} activeId - The ID of the currently active section
 *
 * Usage:
 *   const activeSection = useActiveSection(['home', 'about', 'skills', 'projects', 'contact']);
 */

import { useState, useEffect, useRef } from 'react';

export default function useActiveSection(
  sectionIds,
  { rootMargin = '-80px 0px -40% 0px' } = {}
) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const observerRef = useRef(null);

  useEffect(() => {
    /* Clean up previous observer */
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    /* Track ratio of each section in view */
    const visibilityMap = new Map();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        /* Pick the section with the highest visibility ratio */
        let maxRatio = 0;
        let mostVisible = activeId;

        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            mostVisible = id;
          }
        });

        if (maxRatio > 0) {
          setActiveId(mostVisible);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1.0], rootMargin }
    );

    /* Observe each section element */
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [sectionIds.join(','), rootMargin]);

  return activeId;
}
