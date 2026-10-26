import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * Brand Icon: Mary and the Blessed Sacrament
 * Establishing image from the Blessed Sacrament in Niepokalanów, Poland:
 * Slim-looking Mary outline without the circle around Mary (which made it look fat).
 * Depicts her slender veiled head, slim graceful silhouette, her open hands
 * flanking the Blessed Sacrament, and radiating Eucharistic Monstrance.
 */
/**
 * Brand Icon: Mary and the Blessed Sacrament
 * Establishing image from the Blessed Sacrament in Niepokalanów, Poland:
 * - Beautifully contoured veiled head bowed in adoration (no fat circle)
 * - Distinct, visible arms and reverent hands cupping the Blessed Sacrament
 * - Graceful tapered lower torso narrowing down toward a slender sacred base
 * - Radiant Eucharistic Monstrance in the center
 */
export const MaryAndBlessedSacramentIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg 
    viewBox="0 0 32 32" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.35" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Circular Halo behind Mary's head */}
    <circle cx="16" cy="5" r="4.2" strokeWidth="0.9" opacity="0.65" className="text-amber-300" />

    {/* IMPROVED SHAPE OF MARY'S HEAD and VEIL: Graceful, serene, gently inclined oval head */}
    <path 
      d="M16 2.2c-2.2 0-3.8 1.4-3.8 3.4 0 1.5.8 2.8 1.8 3.6" 
      strokeWidth="1.3" 
    />
    <path 
      d="M16 2.2c2.2 0 3.8 1.4 3.8 3.4 0 1.5-.8 2.8-1.8 3.6" 
      strokeWidth="1.3" 
    />
    {/* Delicate face profile inclined in peaceful contemplation */}
    <path 
      d="M14.8 4.2c.3-.5.8-.7 1.3-.6.6.1.9.6.9 1.2 0 .6-.4 1.2-.8 1.5" 
      strokeWidth="1.0" 
    />

    {/* MARY'S ARMS AND HANDS: Clearly visible, graceful sleeves, arms and joined/reverencing hands */}
    {/* Left Arm: From left shoulder (12.2, 9.2) to elbow (9.5, 15) and forearm reaching to center */}
    <path d="M12.2 9.2c-1.6 1.4-2.7 3.5-2.7 5.8 0 1.4.5 2.5 1.5 3.2" strokeWidth="1.3" />
    <path d="M11 18.2l2.6-.4c.8-.1 1.4-.6 1.7-1.3l.5-1.2" strokeWidth="1.2" />
    {/* Left Hand: Slender fingers cupping/adoring the Blessed Sacrament */}
    <path d="M14.5 14.8c.2-.5.5-.8.9-.7.4.1.5.5.3 1.0-.3.7-.8 1.2-1.3 1.5" strokeWidth="1.1" />

    {/* Right Arm: From right shoulder (19.8, 9.2) to elbow (22.5, 15) and forearm reaching to center */}
    <path d="M19.8 9.2c1.6 1.4 2.7 3.5-2.7 5.8 0 1.4.5 2.5-1.5 3.2" strokeWidth="1.3" />
    <path d="M21 18.2l-2.6-.4c-.8-.1-1.4-.6-1.7-1.3l-.5-1.2" strokeWidth="1.2" />
    {/* Right Hand: Slender fingers cupping/adoring the Blessed Sacrament */}
    <path d="M17.5 14.8c-.2-.5-.5-.8-.9-.7-.4.1-.5.5-.3 1.0.3.7.8 1.2 1.3 1.5" strokeWidth="1.1" />

    {/* THE BLESSED SACRAMENT and RADIANT MONSTRANCE: Held at center */}
    {/* Monstrance outer glory circle */}
    <circle cx="16" cy="16.5" r="2.8" strokeWidth="1.3" className="text-amber-300" />
    {/* Radiant starburst rays */}
    <path d="M16 12.6v-1.2M16 20.4v1.2M12.1 16.5h-1.2M21.1 16.5h-1.2M13.2 13.7l-.8-.8M19.6 19.3l-.8-.8M13.2 19.3l-.8.8M19.6 13.7l-.8.8" strokeWidth="0.85" />
    {/* The Sacred Host inside - bright white with sacred cross */}
    <circle cx="16" cy="16.5" r="1.4" strokeWidth="0.7" fill="#FFFFFF" stroke="#D4A373" />
    <path d="M16 15.7v1.6M15.2 16.5h1.6" stroke="#B45309" strokeWidth="0.6" strokeLinecap="round" />
    {/* Monstrance stem and base */}
    <path d="M15.4 19.3v1.8h1.2v-1.8" strokeWidth="1.0" />
    <path d="M14.2 21.1h3.6" strokeWidth="1.1" />

    {/* LOWER TORSO SUPPOSED TO TAPER: Slender waist tapering inward toward the bottom base */}
    {/* Left outer silhouette tapering inward from waist (11.5, 18.5) down to slender base (14.2, 30) */}
    <path d="M11.5 18.5c.6 3.2 1.8 7.2 2.7 11.5" strokeWidth="1.3" />
    {/* Right outer silhouette tapering inward from waist (20.5, 18.5) down to slender base (17.8, 30) */}
    <path d="M20.5 18.5c-.6 3.2-1.8 7.2-2.7 11.5" strokeWidth="1.3" />

    {/* Slender tapered pedestal base */}
    <path d="M14.2 30c1.2.3 2.4.3 3.6 0" strokeWidth="1.3" />
    {/* Central vertical flowing fold running down the tapered torso */}
    <path d="M16 21.8v8" strokeWidth="0.9" opacity="0.75" />
    <path d="M14.8 23c.3 2.2.6 4.5.8 6.8" strokeWidth="0.75" opacity="0.5" />
    <path d="M17.2 23c-.3 2.2-.6 4.5-.8 6.8" strokeWidth="0.75" opacity="0.5" />
  </svg>
);

/**
 * Main App Icon: Golden Monstrance with a White Host in the Middle
 * - Majestic golden solar rays (sunburst) radiating outward
 * - Ornate cross crowning the monstrance
 * - Outer golden lunette ring holding the sacred luna
 * - Brilliant pure white Consecrated Host in the center with delicate holy cross embossing
 * - Sculpted golden knop / node and flared tiered altar base
 */
export const GoldenMonstranceIcon: React.FC<IconProps> = ({ className = 'w-7 h-7' }) => (
  <svg 
    viewBox="0 0 32 32" 
    fill="none" 
    className={className}
    aria-label="Golden Monstrance with White Host"
  >
    <defs>
      <linearGradient id="monstranceGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="30%" stopColor="#F59E0B" />
        <stop offset="65%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="monstranceStemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#D97706" />
        <stop offset="50%" stopColor="#FDE047" />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <radialGradient id="sacredWhiteHost" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="85%" stopColor="#FDFEFE" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </radialGradient>
      <filter id="goldHostAura" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#FBBF24" floodOpacity="0.8" />
      </filter>
      {/* Divine Mercy Red Blood Ray Gradients (Left Stream per user instruction) */}
      <linearGradient id="divineMercyRedGrad" x1="60%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#DC2626" stopOpacity="0.80" />
        <stop offset="100%" stopColor="#991B1B" stopOpacity="0.25" />
      </linearGradient>
      {/* Divine Mercy Pale Water Ray Gradients (Right Stream per user instruction) */}
      <linearGradient id="divineMercyPaleGrad" x1="40%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#E0F2FE" stopOpacity="0.80" />
        <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.25" />
      </linearGradient>
    </defs>

    {/* DIVINE MERCY LOWER RAYS: Streaming downward from the Sacred Host / Heart of Christ */}
    {/* 1. Red Ray Stream (Blood of Christ / Holy Eucharist) on the LEFT per user request */}
    <path 
      d="M15 14L3.5 31.5h8.5l3.2-17.5z" 
      fill="url(#divineMercyRedGrad)" 
      opacity="0.45" 
    />
    <g stroke="url(#divineMercyRedGrad)" strokeLinecap="round">
      <line x1="15" y1="15" x2="4.5" y2="31" strokeWidth="1.3" />
      <line x1="15.2" y1="15.5" x2="8" y2="31.2" strokeWidth="1.1" />
      <line x1="15.5" y1="16" x2="11.5" y2="31.5" strokeWidth="0.9" />
    </g>

    {/* 2. Pale Ray Stream (Water of Baptism / Justification) on the RIGHT per user request */}
    <path 
      d="M17 14L28.5 31.5h-8.5l-3.2-17.5z" 
      fill="url(#divineMercyPaleGrad)" 
      opacity="0.40" 
    />
    <g stroke="url(#divineMercyPaleGrad)" strokeLinecap="round">
      <line x1="17" y1="15" x2="27.5" y2="31" strokeWidth="1.3" />
      <line x1="16.8" y1="15.5" x2="24" y2="31.2" strokeWidth="1.1" />
      <line x1="16.5" y1="16" x2="20.5" y2="31.5" strokeWidth="0.9" />
    </g>

    {/* Radiant golden sunburst rays: mathematically equidistant and of the exact same size around (16, 13) */}
    <g stroke="url(#monstranceGoldMain)" strokeWidth="1.2" strokeLinecap="round">
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-120 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-105 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-90 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-75 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-60 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-45 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-30 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(-15 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(15 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(30 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(45 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(60 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(75 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(90 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(105 16 13)" />
      <line x1="16" y1="1.0" x2="16" y2="5.8" transform="rotate(120 16 13)" />
    </g>

    {/* Top Cross crowning the Monstrance */}
    <path 
      d="M16 1v3.4M14.6 2.4h2.8" 
      stroke="#FEF08A" 
      strokeWidth="1.35" 
      strokeLinecap="round" 
    />

    {/* Outer ornate golden lunette ring */}
    <circle 
      cx="16" 
      cy="13" 
      r="6.2" 
      stroke="url(#monstranceGoldMain)" 
      strokeWidth="1.8" 
      fill="none" 
    />

    {/* Inner golden rim of the Luna */}
    <circle 
      cx="16" 
      cy="13" 
      r="4.6" 
      stroke="#FDE047" 
      strokeWidth="0.8" 
      fill="none" 
    />

    {/* THE WHITE HOST IN THE MIDDLE: Pure, immaculate, luminous Consecrated Host */}
    <circle 
      cx="16" 
      cy="13" 
      r="3.8" 
      fill="url(#sacredWhiteHost)" 
      stroke="#D4A373" 
      strokeWidth="0.7" 
      filter="url(#goldHostAura)"
    />

    {/* Monstrance Stem and Node (Knop) */}
    <path 
      d="M14.8 19.2h2.4v1.8h-2.4z" 
      fill="url(#monstranceStemGrad)" 
    />
    <ellipse 
      cx="16" 
      cy="22.2" 
      rx="2.2" 
      ry="1.4" 
      fill="url(#monstranceGoldMain)" 
      stroke="#FDE047" 
      strokeWidth="0.6" 
    />
    <path 
      d="M15.2 23.6h1.6v2.2h-1.6z" 
      fill="url(#monstranceStemGrad)" 
    />

    {/* Flared Monstrance Altar Pedestal with stepped tiers */}
    <path 
      d="M12.4 28.4c.8-1.7 2.2-2.6 3.6-2.6s2.8.9 3.6 2.6l1.2 1.8H11.2l1.2-1.8z" 
      fill="url(#monstranceGoldMain)" 
      stroke="#FDE047" 
      strokeWidth="0.7" 
    />
    <rect 
      x="10.5" 
      y="30" 
      width="11" 
      height="1.3" 
      rx="0.6" 
      fill="#B45309" 
      stroke="#FEF08A" 
      strokeWidth="0.5" 
    />
  </svg>
);

/**
 * Saint of the Day icon: A head and a halo, but without eyes, nose, ears, and mouth.
 * Displays a serene head silhouette in front of a circular halo behind the head.
 */
export const SaintWithHaloIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="Saint with Halo"
  >
    {/* Circular Halo BEHIND the head (extends above and behind the head) */}
    <circle 
      cx="12" 
      cy="9" 
      r="7" 
      stroke="currentColor" 
      strokeWidth="1.6" 
    />
    <circle 
      cx="12" 
      cy="9" 
      r="5.6" 
      stroke="currentColor" 
      strokeWidth="0.9" 
      opacity="0.6" 
    />
    
    {/* Serene Head ONLY in front of the halo - smooth silhouette WITHOUT eyes, nose, ears, or mouth */}
    <path 
      d="M12 7.5c-2.4 0-4.2 1.8-4.2 4.2 0 2.2 1.5 4.3 3.4 5.3.5.2 1.1.2 1.6 0 1.9-1 3.4-3.1 3.4-5.3 0-2.4-1.8-4.2-4.2-4.2z" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      fill="currentColor" 
      fillOpacity="0.12" 
    />
  </svg>
);

/**
 * 2. Reflection icon: Outline of Auguste Rodin's "The Thinker" (Le Penseur)
 * Seated figure in deep contemplation: bowed head resting chin on hand,
 * elbow propped upon the knee, arched back, seated on a rock pedestal.
 */
export const RightFacingQuoteIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="Rodin's The Thinker — Reflection"
  >
    {/* Bowed head in contemplation */}
    <circle cx="15.6" cy="5.2" r="2.1" />

    {/* Arched neck, shoulders, and curved spine down to seated hip */}
    <path d="M13.6 5.6C10.4 6.4 7.4 9.2 6.8 13.0c-.2 1.4.5 2.4 1.8 2.6" />

    {/* Upper arm reaching forward and forearm rising to support the chin */}
    <path d="M11.4 7.6L14.6 13.2L15.8 7.4" />

    {/* Seated thigh extending to knee, and lower leg descending to foot on pedestal */}
    <path d="M8.6 15.6L15.4 13.8L14.4 20.4" />

    {/* Second leg / calf in subtle relief behind */}
    <path d="M12.2 14.8L11.5 20.4" strokeWidth="1.4" opacity="0.8" />

    {/* Sculpted rock pedestal base beneath the seated figure */}
    <path d="M4.5 16.0H8.8V20.5H17.5" />
    <line x1="3.8" y1="20.5" x2="19.2" y2="20.5" />
  </svg>
);

export const RodinThinkerIcon = RightFacingQuoteIcon;
export const ReflectionIcon = RightFacingQuoteIcon;

/**
 * 3. Catechism icon: A scroll without bends (flat straight parchment scroll)
 */
export const BetterScrollIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Top straight dowel rod without bend with round finials */}
    <line x1="3" y1="4.5" x2="21" y2="4.5" strokeWidth="2" />
    <circle cx="3" cy="4.5" r="1.2" fill="currentColor" />
    <circle cx="21" cy="4.5" r="1.2" fill="currentColor" />

    {/* Bottom straight dowel rod without bend with round finials */}
    <line x1="3" y1="19.5" x2="21" y2="19.5" strokeWidth="2" />
    <circle cx="3" cy="19.5" r="1.2" fill="currentColor" />
    <circle cx="21" cy="19.5" r="1.2" fill="currentColor" />

    {/* Flat straight parchment body without bend or curled curves */}
    <rect x="5.5" y="4.5" width="13" height="15" fill="none" strokeWidth="1.6" />

    {/* Sacred Cross on Catechism scroll */}
    <line x1="12" y1="7.5" x2="12" y2="13.5" strokeWidth="1.6" />
    <line x1="9.5" y1="9.5" x2="14.5" y2="9.5" strokeWidth="1.6" />

    {/* Straight doctrinal teaching lines */}
    <line x1="8.5" y1="15" x2="15.5" y2="15" strokeWidth="1.3" />
    <line x1="8.5" y1="17" x2="13.5" y2="17" strokeWidth="1.3" />
  </svg>
);

export const ScrollWithoutBendsIcon = BetterScrollIcon;

/**
 * 4. Wisdom of the Saints icon: Front-facing Holy Spirit Dove modeled after
 * the St. Ann Parish church baptistery fresco (https://www.stannparish.org/blog-post/dove-kd2dg):
 * - Circular radiant halo behind the dove's head
 * - Front-facing head with downward-pointing beak and smooth breast
 * - Two wings only, horizontally extended with pronounced, layered flight feathers
 * - Beautiful fanned tail feathers descending beneath the body
 */
export const DoveWithHaloIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.6" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="Holy Spirit Dove — Wisdom of the Saints"
  >
    {/* Circular radiant halo behind the head */}
    <circle 
      cx="12" 
      cy="7" 
      r="4.2" 
      strokeWidth="1.15" 
      stroke="currentColor" 
      opacity="0.85" 
    />
    {/* Subtle celestial glory rays radiating from halo */}
    <g stroke="currentColor" strokeWidth="0.85" opacity="0.65">
      <line x1="12" y1="1.6" x2="12" y2="2.7" />
      <line x1="8.2" y1="3.2" x2="9.0" y2="4.0" />
      <line x1="15.8" y1="3.2" x2="15.0" y2="4.0" />
      <line x1="6.8" y1="7.0" x2="7.7" y2="7.0" />
      <line x1="17.2" y1="7.0" x2="16.3" y2="7.0" />
    </g>

    {/* Front-facing Head and downward beak */}
    <path 
      d="M10.8 6.8c0-1.0.5-1.7 1.2-1.7s1.2.7 1.2 1.7c0 .5-.3 1.0-.6 1.3L12 9.5l-.6-1.4c-.4-.3-.6-.8-.6-1.3Z" 
      strokeWidth="1.5" 
      fill="currentColor" 
      fillOpacity="0.12" 
    />
    <path d="M11.5 7.6L12 8.9L12.5 7.6" strokeWidth="1.2" />

    {/* Left Wing: Extended horizontally with pronounced primary and secondary feathers */}
    <path 
      d="M10.8 8.4 C7.8 7.5 4.5 7.6 1.2 9.0 c1.1 1.4 2.2 2.3 3.4 2.8-.2.7.2 1.3.8 1.7.8.5 1.7.6 2.6.6.6.6 1.4.9 2.2.9" 
      strokeWidth="1.6" 
    />
    {/* Left wing internal feather contour lines */}
    <path d="M4.6 11.8 c2.0-.4 4.0-.8 6.0-1.1" strokeWidth="1.0" opacity="0.65" />
    <path d="M7.4 13.5 c1.1-.3 2.2-.6 3.2-.8" strokeWidth="0.85" opacity="0.5" />

    {/* Right Wing: Extended horizontally with pronounced primary and secondary feathers */}
    <path 
      d="M13.2 8.4 C16.2 7.5 19.5 7.6 22.8 9.0 c-1.1 1.4-2.2 2.3-3.4 2.8.2.7-.2 1.3-.8 1.7-.8.5-1.7.6-2.6.6-.6.6-1.4.9-2.2.9" 
      strokeWidth="1.6" 
    />
    {/* Right wing internal feather contour lines */}
    <path d="M19.4 11.8 c-2.0-.4-4.0-.8-6.0-1.1" strokeWidth="1.0" opacity="0.65" />
    <path d="M16.6 13.5 c-1.1-.3-2.2-.6-3.2-.8" strokeWidth="0.85" opacity="0.5" />

    {/* Smooth Dove Breast / Torso facing front */}
    <path 
      d="M10.2 14.0 c-.1 1.6.7 2.8 1.8 3.2 1.1-.4 1.9-1.6 1.8-3.2" 
      strokeWidth="1.5" 
      fill="currentColor" 
      fillOpacity="0.08" 
    />

    {/* Fanned Tail Feathers descending beneath the body */}
    <path 
      d="M10.8 17.2 L8.8 21.8 c2.0.7 4.4.7 6.4 0 L13.2 17.2" 
      strokeWidth="1.6" 
    />
    {/* Center tail quill and feather splits */}
    <line x1="12" y1="17.2" x2="12" y2="22.2" strokeWidth="1.2" />
    <line x1="10.4" y1="19.5" x2="9.6" y2="21.5" strokeWidth="0.9" opacity="0.6" />
    <line x1="13.6" y1="19.5" x2="14.4" y2="21.5" strokeWidth="0.9" opacity="0.6" />
  </svg>
);

// Backward-compatible alias
export const BulbWithHaloIcon = DoveWithHaloIcon;

/**
 * 5. Treasury of Prayers icon: Two books standing, and a third book that is leaning ON the second book,
 * not leaning away from the second book.
 */
export const ThreePrayerBooksIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Shelf line / base */}
    <line x1="2" y1="21" x2="22" y2="21" strokeWidth="1.8" />

    {/* Book 1: Standing upright on the left */}
    <rect x="4" y="5.5" width="3.5" height="15.5" rx="0.6" strokeWidth="1.6" />
    <line x1="5.7" y1="8.5" x2="5.7" y2="13.5" strokeWidth="1.2" />

    {/* Book 2: Standing upright beside Book 1 */}
    <rect x="8.5" y="4" width="3.5" height="17" rx="0.6" strokeWidth="1.6" />
    <line x1="10.2" y1="7" x2="10.2" y2="12" strokeWidth="1.2" />
    <path d="M10.2 14v4l1-1 1 1v-4" strokeWidth="1.1" />

    {/* Book 3: Leaning ON Book 2 (tilted left toward Book 2, resting against it) */}
    {/* Base anchored to the right, top resting against Book 2's upper spine */}
    <g transform="rotate(-18 19 21)">
      <rect x="13.5" y="4.5" width="3.5" height="16.5" rx="0.6" strokeWidth="1.6" />
      <line x1="15.2" y1="7.5" x2="15.2" y2="12.5" strokeWidth="1.2" />
    </g>
  </svg>
);

// Backward-compatible alias
export const PrayingHandsIcon = ThreePrayerBooksIcon;

/**
 * 6. Rosary and Chaplet icon: A ten-bead Rosary. The Chaplet at the left, and the Rosary at the right.
 */
export const RosaryAndChapletIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Left 5 beads: The Chaplet */}
    <circle cx="8" cy="4" r="1.2" fill="currentColor" />
    <circle cx="5.5" cy="7" r="1.2" fill="currentColor" />
    <circle cx="4.5" cy="11" r="1.2" fill="currentColor" />
    <circle cx="6" cy="14.5" r="1.2" fill="currentColor" />
    <circle cx="9" cy="17" r="1.2" fill="currentColor" />

    {/* Right 5 beads: The Holy Rosary */}
    <circle cx="16" cy="4" r="1.2" fill="currentColor" />
    <circle cx="18.5" cy="7" r="1.2" fill="currentColor" />
    <circle cx="19.5" cy="11" r="1.2" fill="currentColor" />
    <circle cx="18" cy="14.5" r="1.2" fill="currentColor" />
    <circle cx="15" cy="17" r="1.2" fill="currentColor" />

    {/* Connecting cord loop */}
    <path d="M8 4c2.5-1.5 5.5-1.5 8 0" strokeWidth="1" strokeDasharray="1 1" />
    <path d="M4.5 11c0-2 .5-3 1-4" strokeWidth="1" />
    <path d="M19.5 11c0-2-.5-3-1-4" strokeWidth="1" />
    <path d="M6 14.5c1 1.5 2 2 3 2.5" strokeWidth="1" />
    <path d="M18 14.5c-1 1.5-2 2-3 2.5" strokeWidth="1" />

    {/* Centerpiece Medallion */}
    <circle cx="12" cy="17.5" r="1.5" fill="currentColor" />

    {/* Crucifix hanging down from centerpiece */}
    <path d="M12 19v4.5" strokeWidth="1.8" />
    <path d="M10 21h4" strokeWidth="1.8" />
  </svg>
);

/**
 * 7. Marian Messages icon: The lean figure of Mary with her hands joined in prayer;
 * there is no crown but her hair flows from her head.
 */
export const MaryPrayingOutlineIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.6" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Mary's head bowed gently in prayer (no crown) */}
    <circle cx="12" cy="4.2" r="2.2" strokeWidth="1.5" />
    <path d="M11.6 3.8c.3-.4.8-.6 1.3-.4" strokeWidth="1.0" />

    {/* Long hair flowing gently from her head down past her shoulders */}
    <path d="M10.2 4.6c-1.2 1.4-1.8 3.2-1.7 5.2.1 2 .8 3.5 1.1 5" strokeWidth="1.2" />
    <path d="M13.8 4.6c1.2 1.4 1.8 3.2 1.7 5.2-.1 2-.8 3.5-1.1 5" strokeWidth="1.2" />
    <path d="M9.2 6.8c-.8 2-1 4.5-.6 7" strokeWidth="1.0" opacity="0.7" />
    <path d="M14.8 6.8c.8 2 1 4.5.6 7" strokeWidth="1.0" opacity="0.7" />

    {/* Lean, slender figure of Mary cascading downward */}
    <path d="M9.8 14.5c-.8 2.2-1.6 4.8-1.8 7.5" strokeWidth="1.4" />
    <path d="M14.2 14.5c.8 2.2 1.6 4.8 1.8 7.5" strokeWidth="1.4" />
    <path d="M8 22c2.6.4 5.4.4 8 0" strokeWidth="1.3" />

    {/* Slender hands joined in prayer at her breast */}
    <path d="M12 9.8v5" strokeWidth="1.5" />
    <path d="M10.8 11.6l1.2-1.8 1.2 1.8" strokeWidth="1.4" />
    <path d="M10.2 13.8l1.8-1.5 1.8 1.5" strokeWidth="1.2" />
  </svg>
);

/**
 * 8. Novena Tracker icon: Hands joined in prayer but from left to right;
 * the number 9 is below the hands but not joined to the hands.
 */
export const NovenaHands9Icon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Hands joined in prayer heavenward from left to right, forming a "V" above the number 9 */}
    {/* Left hand rising heavenward to the upper-left from the joined base at (12, 11.2) */}
    <path d="M12 11.2L6.8 3.6c-.4-.6-.2-1.3.4-1.5.5-.2 1.1.1 1.5.7L12 8.2" strokeWidth="1.7" />
    {/* Right hand rising heavenward to the upper-right from the joined base at (12, 11.2) */}
    <path d="M12 11.2l5.2-7.6c.4-.6.2-1.3-.4-1.5-.5-.2-1.1.1-1.5.7L12 8.2" strokeWidth="1.7" />

    {/* Inner finger contour lines along the left and right wings of the "V" */}
    <path d="M10.4 8.8L7.9 5.0" strokeWidth="1.2" opacity="0.75" />
    <path d="M13.6 8.8l2.5-3.8" strokeWidth="1.2" opacity="0.75" />

    {/* Number 9 clearly placed BELOW the hands, separated with negative space and NOT joined to the hands */}
    <g transform="translate(12, 18.8)">
      {/* Upper loop of 9 */}
      <circle cx="0" cy="-2.4" r="2.2" strokeWidth="1.8" />
      {/* Downward stem of 9 curving at bottom */}
      <path d="M2.2 -2.4v3.4c0 1.2-.9 2-2 2a2.2 2.2 0 0 1-1.8-.9" strokeWidth="1.8" />
    </g>
  </svg>
);

// Backward-compatible alias
export const NovenaHands1to9Icon = NovenaHands9Icon;

/**
 * 9. Bible study icon: A Bible with three lines on each side representing highlighting
 */
export const BibleStudyHighlightedIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Open Bible Pages Outline */}
    <path d="M12 6.5C10 5 6.5 5 2 6v14c4.5-1 8-1 10 .5 2-1.5 5.5-1.5 10-.5V6c-4.5-1-8-1-10 .5z" strokeWidth="1.8" />
    {/* Center Spine */}
    <line x1="12" y1="6.5" x2="12" y2="20.5" strokeWidth="1.8" />

    {/* Three Highlight Lines on Left Page */}
    <line x1="4.5" y1="9.5" x2="9.5" y2="9.5" strokeWidth="1.8" />
    <line x1="4.5" y1="12.5" x2="9.5" y2="12.5" strokeWidth="1.8" />
    <line x1="4.5" y1="15.5" x2="8" y2="15.5" strokeWidth="1.8" />

    {/* Three Highlight Lines on Right Page */}
    <line x1="14.5" y1="9.5" x2="19.5" y2="9.5" strokeWidth="1.8" />
    <line x1="14.5" y1="12.5" x2="19.5" y2="12.5" strokeWidth="1.8" />
    <line x1="14.5" y1="15.5" x2="18" y2="15.5" strokeWidth="1.8" />
  </svg>
);

/**
 * 10. Perpetual Adoration icon: Outline of a person kneeling in profound prayer
 */
export const KneelingAdorationIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Head of kneeling adorer, bowed reverently forward in adoration */}
    <circle cx="10" cy="5.5" r="2.5" strokeWidth="1.6" />
    {/* Soft celestial halo or prayer glow over the adorer's head */}
    <path d="M7.5 4a3.5 3.5 0 0 1 5 0" strokeWidth="1.2" className="text-amber-300" />

    {/* Torso bent forward in profound worship */}
    <path d="M10 8c1.5 1 2.5 3.5 2 6.5" strokeWidth="1.6" />
    {/* Back curve bowed in prayer */}
    <path d="M8 8c-1.5 2-2 5-1.5 8" strokeWidth="1.6" />

    {/* Hands joined in prayer extended towards the Blessed Sacrament */}
    <path d="M11 10.5l4-1.5 1 2-3.5 2.5" strokeWidth="1.5" />
    {/* Clasped palms */}
    <path d="M15 9l2-.5" strokeWidth="1.8" className="text-amber-400" />

    {/* Kneeling Thighs, bent knees resting on the prayer kneeling pad / floor */}
    <path d="M6.5 16l4 2.5" strokeWidth="1.8" />
    <path d="M10.5 18.5l-6 2.5" strokeWidth="1.8" />
    {/* Prie-dieu or chapel floor line */}
    <line x1="3" y1="21.5" x2="21" y2="21.5" strokeWidth="1.5" className="text-amber-400/60" />

    {/* Monstrance / Eucharistic radiance on the right in front of the adorer */}
    <circle cx="19" cy="9" r="1.5" strokeWidth="1.3" className="text-amber-300" />
    <path d="M19 6.5v1M19 10.5v1M16.5 9h1M20.5 9h1" strokeWidth="1.0" className="text-amber-300" />
    <line x1="19" y1="11.5" x2="19" y2="15" strokeWidth="1.2" className="text-amber-400" />
    <line x1="17.5" y1="15" x2="20.5" y2="15" strokeWidth="1.4" className="text-amber-400" />
  </svg>
);

/**
 * 11. Prayer Request icon: Three persons holding hands in prayer
 */
export const ThreePersonsPrayingIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    {/* Person 1 (Left) */}
    <circle cx="5.5" cy="6" r="2.2" />
    <path d="M2.5 18v-4a3 3 0 0 1 3-3h.5" />

    {/* Person 2 (Center - slightly elevated in prayer) */}
    <circle cx="12" cy="5" r="2.5" />
    <path d="M8.5 18v-4.5a3.5 3.5 0 0 1 7 0V18" />

    {/* Person 3 (Right) */}
    <circle cx="18.5" cy="6" r="2.2" />
    <path d="M18 11h.5a3 3 0 0 1 3 3v4" />

    {/* Clasping hands joined between all three persons */}
    <path d="M5.5 12.5c2.5 1 4 1 6.5 0" strokeWidth="1.5" />
    <path d="M12 12.5c2.5 1 4 1 6.5 0" strokeWidth="1.5" />
  </svg>
);

/**
 * 12. Catholic Podcasts icon: Outline of headphones
 */
export const CatholicPodcastNavIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    aria-label="Catholic Podcasts Headphones"
  >
    {/* Headband arch */}
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    {/* Left and right earcups outline */}
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

/**
 * 13. Eucharistic Miracles Nav Icon: Monstrance outline using currentColor so it changes color on hover in the Index
 */
export const EucharisticMonstranceNavIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Eucharistic Monstrance"
  >
    {/* Top Cross */}
    <path d="M12 1.5v2.5M10.8 2.7h2.4" strokeWidth="1.5" />
    {/* Sunburst Rays */}
    <path d="M12 4.5v1M12 14.5v1M7 9.5H6M18 9.5h-1M8.5 6l-.8-.8M16.3 13.8l-.8-.8M15.5 6l.8-.8M7.7 13.8l.8-.8" strokeWidth="1.3" />
    {/* Outer Lunette and Host */}
    <circle cx="12" cy="9.5" r="4.2" strokeWidth="1.7" />
    <circle cx="12" cy="9.5" r="2.2" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
    {/* Stem, Knop and Pedestal Base */}
    <path d="M12 13.7v4.8" strokeWidth="1.8" />
    <circle cx="12" cy="16.2" r="1.1" fill="currentColor" />
    <path d="M8.5 21.5c1-1.8 2.2-2.7 3.5-2.7s2.5.9 3.5 2.7" strokeWidth="1.7" />
    <line x1="7.5" y1="21.5" x2="16.5" y2="21.5" strokeWidth="1.8" />
  </svg>
);


