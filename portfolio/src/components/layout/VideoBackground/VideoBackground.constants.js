/**
 * VideoBackground.constants.js — Project NOVA Layout Component Constants
 *
 * Configures the section to background video source mapping and gradient fallbacks.
 * Uses the canonical settings from constants/config.js.
 *
 * DS Reference: DESIGN_SYSTEM.md §23 — Video System
 */

import { VIDEO_SCENES } from '../../../constants/config';

/**
 * Maps each active section ID to its corresponding video path.
 * If a section lacks a video key, it defaults to the hero scene.
 */
export const SECTION_TO_VIDEO = {
  home:     VIDEO_SCENES.hero,
  about:    VIDEO_SCENES.about,
  skills:   VIDEO_SCENES.skills,
  projects: VIDEO_SCENES.projects,
  contact:  VIDEO_SCENES.contact,
};

/**
 * Animated nebula radial gradient fallback.
 * Shown when video loading is disabled (mobile, slow connection, prefers-reduced-motion)
 * or when video playback fails.
 *
 * DS Reference: DESIGN_SYSTEM.md §5 — Space aesthetic (large, deep, dark theme)
 */
export const FALLBACK_BACKDROP_STYLE = {
  background: `
    radial-gradient(ellipse 80% 60% at 20% 40%, rgba(0, 229, 255, 0.04) 0%, transparent 60%),
    radial-gradient(ellipse 60% 80% at 80% 60%, rgba(124, 58, 237, 0.05) 0%, transparent 60%),
    radial-gradient(ellipse 100% 100% at 50% 50%, #020617 50%, #040d20 100%)
  `,
};
