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
 * When hovered on, the halo slowly increases in size and glows.
 */
export const SaintWithHaloIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Saint with Halo"
  >
    {/* Circular Halo BEHIND the head (slowly increases in size and glows on hover) */}
    <g className="sanctum-saint-halo">
      <circle
        cx="12"
        cy="9"
        r="7.2"
        fill="#FEF08A"
        stroke="none"
        className="sanctum-saint-halo-aura"
      />
      <circle 
        cx="12" 
        cy="9" 
        r="7" 
        stroke="currentColor" 
        strokeWidth="1.6" 
        className="sanctum-saint-halo-ring"
      />
      <circle 
        cx="12" 
        cy="9" 
        r="5.6" 
        stroke="currentColor" 
        strokeWidth="0.9" 
        opacity="0.6" 
        className="sanctum-saint-halo-inner"
      />
    </g>
    
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
 * When not hovered on, the figure is sitting upright on the pedestal;
 * when hovered on, it slowly bends forward into its contemplative Thinker position.
 */
export const RightFacingQuoteIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Rodin's The Thinker — Reflection"
  >
    {/* Head: upright by default, bows forward in contemplation on hover */}
    <circle
      cx="9.4"
      cy="3.8"
      r="2.1"
      className="sanctum-thinker-head"
    />

    {/* Neck, shoulders, and spine down to seated hip: upright by default, arches forward on hover */}
    <path
      d="M 8.8 6.2 C 8.4 8.4 8.2 10.8 8.2 13.0 C 8.2 14.4 8.3 15.2 8.6 15.6"
      className="sanctum-thinker-spine"
    />

    {/* Upper arm and forearm: resting on lap when upright, propping chin on knee when bent on hover */}
    <path
      d="M 9.0 7.4 L 10.2 12.6 L 14.4 13.4"
      className="sanctum-thinker-arm"
    />

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
 * 3. Catechism icon: Wooden scroll rollers closed when not hovered,
 * smoothly unrolling open to reveal the Catechism parchment and cross on hover.
 */
export const BetterScrollIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Catechism Scroll"
  >
    {/* Unrolled Parchment Body, Sacred Cross & Doctrinal Lines (hidden/collapsed when closed, unfurls gradually on hover) */}
    <g className="sanctum-scroll-parchment">
      {/* Flat straight parchment sheet between the two wooden rollers (y=5.7 to y=18.3, centered at y=12) */}
      <line x1="5.8" y1="5.7" x2="5.8" y2="18.3" strokeWidth="1.6" />
      <line x1="18.2" y1="5.7" x2="18.2" y2="18.3" strokeWidth="1.6" />
      <rect x="5.8" y="5.7" width="12.4" height="12.6" fill="currentColor" fillOpacity="0.06" stroke="none" />

      {/* Sacred Cross on Catechism scroll */}
      <line x1="12" y1="7.6" x2="12" y2="13.2" strokeWidth="1.6" />
      <line x1="9.6" y1="9.6" x2="14.4" y2="9.6" strokeWidth="1.6" />

      {/* Straight doctrinal teaching lines */}
      <line x1="8.6" y1="15.0" x2="15.4" y2="15.0" strokeWidth="1.3" />
      <line x1="8.6" y1="16.8" x2="13.6" y2="16.8" strokeWidth="1.3" />
    </g>

    {/* Top Wooden Scroll Roller & Turned Finials (closed at center by default, rolls up on hover) */}
    <g className="sanctum-scroll-top">
      {/* Left & right wooden dowel spindles */}
      <line x1="2.8" y1="4.5" x2="5.2" y2="4.5" strokeWidth="1.9" />
      <line x1="18.8" y1="4.5" x2="21.2" y2="4.5" strokeWidth="1.9" />
      {/* Turned wooden finials */}
      <circle cx="2.5" cy="4.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="21.5" cy="4.5" r="1.2" fill="currentColor" stroke="none" />
      {/* Wooden scroll roller barrel */}
      <rect
        x="5.2"
        y="3.3"
        width="13.6"
        height="2.4"
        rx="1.1"
        fill="currentColor"
        fillOpacity="0.18"
        strokeWidth="1.65"
      />
    </g>

    {/* Bottom Wooden Scroll Roller & Turned Finials (closed at center by default, rolls down on hover) */}
    <g className="sanctum-scroll-bottom">
      {/* Left & right wooden dowel spindles */}
      <line x1="2.8" y1="19.5" x2="5.2" y2="19.5" strokeWidth="1.9" />
      <line x1="18.8" y1="19.5" x2="21.2" y2="19.5" strokeWidth="1.9" />
      {/* Turned wooden finials */}
      <circle cx="2.5" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="21.5" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
      {/* Wooden scroll roller barrel */}
      <rect
        x="5.2"
        y="18.3"
        width="13.6"
        height="2.4"
        rx="1.1"
        fill="currentColor"
        fillOpacity="0.18"
        strokeWidth="1.65"
      />
    </g>
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
    className={`${className} overflow-visible`}
    aria-label="Holy Spirit Dove — Wisdom of the Saints"
  >
    <g className="sanctum-dove-body">
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

      {/* Left Wing: Extended horizontally with pronounced primary and secondary feathers */}
      <g className="sanctum-dove-wing-left">
        <path 
          d="M10.8 8.4 C7.8 7.5 4.5 7.6 1.2 9.0 c1.1 1.4 2.2 2.3 3.4 2.8-.2.7.2 1.3.8 1.7.8.5 1.7.6 2.6.6.6.6 1.4.9 2.2.9" 
          strokeWidth="1.6" 
        />
        {/* Left wing internal feather contour lines */}
        <path d="M4.6 11.8 c2.0-.4 4.0-.8 6.0-1.1" strokeWidth="1.0" opacity="0.65" />
        <path d="M7.4 13.5 c1.1-.3 2.2-.6 3.2-.8" strokeWidth="0.85" opacity="0.5" />
      </g>

      {/* Right Wing: Extended horizontally with pronounced primary and secondary feathers */}
      <g className="sanctum-dove-wing-right">
        <path 
          d="M13.2 8.4 C16.2 7.5 19.5 7.6 22.8 9.0 c-1.1 1.4-2.2 2.3-3.4 2.8.2.7-.2 1.3-.8 1.7-.8.5-1.7.6-2.6.6-.6.6-1.4.9-2.2.9" 
          strokeWidth="1.6" 
        />
        {/* Right wing internal feather contour lines */}
        <path d="M19.4 11.8 c-2.0-.4-4.0-.8-6.0-1.1" strokeWidth="1.0" opacity="0.65" />
        <path d="M16.6 13.5 c-1.1-.3-2.2-.6-3.2-.8" strokeWidth="0.85" opacity="0.5" />
      </g>

      {/* Front-facing Head and downward beak */}
      <path 
        d="M10.8 6.8c0-1.0.5-1.7 1.2-1.7s1.2.7 1.2 1.7c0 .5-.3 1.0-.6 1.3L12 9.5l-.6-1.4c-.4-.3-.6-.8-.6-1.3Z" 
        strokeWidth="1.5" 
        fill="currentColor" 
        fillOpacity="0.12" 
      />
      <path d="M11.5 7.6L12 8.9L12.5 7.6" strokeWidth="1.2" />

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
    </g>
  </svg>
);

// Backward-compatible alias
export const BulbWithHaloIcon = DoveWithHaloIcon;

/**
 * 5. Treasury of Prayers icon: Two books standing, and a third book leaning ON the second book.
 * When hovered on, the books turn once and seamlessly become two hands joined in prayer.
 */
export const ThreePrayerBooksIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Treasury of Prayers — Books Turning into Hands Joined in Prayer"
  >
    {/* Resting State: Three Prayer Books (turns to edge-on at 50% of hover animation) */}
    <g className="sanctum-treasury-books">
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
      <g transform="rotate(-18 19 21)">
        <rect x="13.5" y="4.5" width="3.5" height="16.5" rx="0.6" strokeWidth="1.6" />
        <line x1="15.2" y1="7.5" x2="15.2" y2="12.5" strokeWidth="1.2" />
      </g>
    </g>

    {/* Hover State: Two Hands Joined in Prayer with Visible Forearms (emerges seamlessly from the 50% midpoint of the single turn) */}
    <g className="sanctum-treasury-praying-hands">
      {/* Soft warm fill inside the joined hands */}
      <path
        d="M12 2.2 C10.7 2.4, 9.7 3.5, 9.1 5.5 L7.8 10.2 C7.4 11.6, 7.7 12.9, 8.4 13.8 L11.4 14.2 L12 14.2 L12.6 14.2 L15.6 13.8 C16.3 12.9, 16.6 11.6, 16.2 10.2 L14.9 5.5 C14.3 3.5, 13.3 2.4, 12 2.2 Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="none"
      />

      {/* Center line where the two palms and fingers press together in prayer */}
      <line x1="12" y1="2.2" x2="12" y2="14.2" strokeWidth="1.5" />

      {/* Left Hand: joined fingertips, back of hand, and thumb */}
      <path
        d="M12 2.2 C10.7 2.4, 9.7 3.5, 9.1 5.5 L7.8 10.2 C7.4 11.6, 7.7 12.9, 8.4 13.8"
        strokeWidth="1.75"
      />
      <path
        d="M12 6.8 C10.7 7.3, 9.8 8.5, 9.7 10.2 C9.6 11.4, 10.4 12.4, 12 13.0"
        strokeWidth="1.35"
      />

      {/* Right Hand: joined fingertips, back of hand, and thumb */}
      <path
        d="M12 2.2 C13.3 2.4, 14.3 3.5, 14.9 5.5 L16.2 10.2 C16.6 11.6, 16.3 12.9, 15.6 13.8"
        strokeWidth="1.75"
      />
      <path
        d="M12 6.8 C13.3 7.3, 14.2 8.5, 14.3 10.2 C14.4 11.4, 13.6 12.4, 12 13.0"
        strokeWidth="1.35"
      />

      {/* Left Forearm Outline: distinct outer and inner forearm borders extending down from the left wrist */}
      <path
        d="M8.4 13.8 L4.6 21.6 L8.4 21.6 L11.4 14.2 Z"
        fill="currentColor"
        fillOpacity="0.1"
        strokeWidth="1.7"
      />

      {/* Right Forearm Outline: distinct outer and inner forearm borders extending down from the right wrist */}
      <path
        d="M15.6 13.8 L19.4 21.6 L15.6 21.6 L12.6 14.2 Z"
        fill="currentColor"
        fillOpacity="0.1"
        strokeWidth="1.7"
      />
    </g>
  </svg>
);

// Backward-compatible alias
export const PrayingHandsIcon = ThreePrayerBooksIcon;

/**
 * 6. Rosary and Chaplet icon: A ten-bead Rosary. The Chaplet at the left, and the Rosary at the right.
 * When hovered on, the front beads successively change color from yellow to dark brown.
 */
export const RosaryAndChapletIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Chaplet and Rosary — Ten-Bead Rosary"
  >
    {/* Connecting cord loop (rendered behind the front beads) */}
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

    {/* 10 Front Beads around the loop (successively change from yellow to dark brown on hover): */}
    {/* Left 5 beads: The Chaplet (bottom-left up to top-left) */}
    <circle cx="9" cy="17" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-1" />
    <circle cx="6" cy="14.5" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-2" />
    <circle cx="4.5" cy="11" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-3" />
    <circle cx="5.5" cy="7" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-4" />
    <circle cx="8" cy="4" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-5" />

    {/* Right 5 beads: The Holy Rosary (top-right down to bottom-right) */}
    <circle cx="16" cy="4" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-6" />
    <circle cx="18.5" cy="7" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-7" />
    <circle cx="19.5" cy="11" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-8" />
    <circle cx="18" cy="14.5" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-9" />
    <circle cx="15" cy="17" r="1.55" fill="currentColor" strokeWidth="0.65" className="sanctum-rosary-bead sanctum-rosary-bead-10" />
  </svg>
);

/**
 * 7. Marian Apparitions icon: Our Lady of Lourdes and Saint Bernadette.
 * Depicts the incomparable beauty of Our Lady of Lourdes with celestial halo, flowing veil,
 * blue sash, and golden roses at her feet. When hovered on, Mary's arms open with maternal grace,
 * and Saint Bernadette (one female child) kneels reverently before her across the sacred distance.
 */
export const MaryPrayingOutlineIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Marian Apparitions — Our Lady of Lourdes and Saint Bernadette"
  >
    {/* Subtle Grotto Rock Arch framing Our Lady */}
    <path 
      d="M10.0 1.5 C16.5 1.0, 22.8 4.5, 22.8 12.0 C22.8 17.5, 20.5 21.5, 17.5 22.5" 
      stroke="currentColor" 
      strokeWidth="0.8" 
      opacity="0.25" 
      strokeDasharray="1.5 2" 
    />

    {/* Celestial Radiant Halo behind Our Lady of Lourdes */}
    <circle cx="15.2" cy="3.5" r="3.2" strokeWidth="0.75" stroke="currentColor" opacity="0.55" />
    <circle cx="15.2" cy="3.5" r="4.0" strokeWidth="0.55" stroke="#FEF08A" strokeDasharray="0.8 1.4" opacity="0.75" />

    {/* Our Lady's serene, tenderly bowed oval head */}
    <path 
      d="M15.2 1.8c-1.0 0-1.75.8-1.75 1.85 0 1.15.75 2.0 1.75 2.0s1.75-.85 1.75-2.0c0-1.05-.75-1.85-1.75-1.85z" 
      strokeWidth="1.2" 
      fill="currentColor" 
      fillOpacity="0.12" 
    />

    {/* Flowing white veil (maforion) draping over her shoulders */}
    <path d="M13.6 2.6C12.7 4.0 12.4 5.6 12.6 7.4c.2 1.6.6 3.0 1.0 4.2" strokeWidth="1.1" />
    <path d="M16.8 2.6C17.7 4.0 18.0 5.6 17.8 7.4c-.2 1.6-.6 3.0-1.0 4.2" strokeWidth="1.1" />

    {/* Slender neck & graceful bodice */}
    <path d="M14.6 5.4c0 .6.2 1.0.6 1.0s.6-.4.6-1.0" strokeWidth="0.85" />
    <path d="M13.4 6.5c-.2 1.2.2 2.5.5 4.0" strokeWidth="1.1" />
    <path d="M17.0 6.5c.2 1.2-.2 2.5-.5 4.0" strokeWidth="1.1" />

    {/* Distinct Lourdes Blue Sash tied at waist */}
    <path d="M13.6 8.5c1.0.35 2.1.35 3.1 0" stroke="#38BDF8" strokeWidth="1.1" />
    <path d="M14.2 8.7v3.0" stroke="#38BDF8" strokeWidth="0.85" />

    {/* Cascading immaculate white gown */}
    <path d="M13.4 10.5c-.5 2.5-1.1 5.4-1.3 9.0" strokeWidth="1.2" />
    <path d="M17.0 10.5c.5 2.5 1.1 5.4 1.3 9.0" strokeWidth="1.2" />
    <path d="M14.6 11.0c-.2 2.6-.4 5.2-.5 8.5" strokeWidth="0.75" opacity="0.5" />
    <path d="M15.8 11.0c.2 2.6.4 5.2.5 8.5" strokeWidth="0.75" opacity="0.5" />
    <path d="M12.1 19.5c1.8.4 4.4.4 6.2 0" strokeWidth="1.1" />

    {/* Golden Roses at Mary's feet (distinct to Lourdes) */}
    <circle cx="13.8" cy="19.8" r="0.75" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.4" />
    <circle cx="16.6" cy="19.8" r="0.75" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.4" />

    {/* Resting State: Hands joined in prayer with golden Lourdes Rosary hanging from arm */}
    <g className="sanctum-lourdes-mary-folded">
      <path d="M15.2 6.8v3.2" strokeWidth="1.2" />
      <path d="M14.4 8.0l.8-1.2.8 1.2" strokeWidth="1.1" />
      {/* Golden Lourdes Rosary hanging from right arm */}
      <path d="M15.8 8.0c.6 1.4.6 2.8.2 4.0l-.2 1.0" stroke="#FEF08A" strokeWidth="0.8" strokeDasharray="0.8 0.8" />
      <path d="M15.7 13.0v1.0M15.3 13.5h.8" stroke="#FEF08A" strokeWidth="0.6" />
    </g>

    {/* Hover State 1: Mary's arms outstretched in maternal grace with descending rays */}
    <g className="sanctum-lourdes-mary-outstretched">
      {/* Left arm reaching gracefully toward Bernadette */}
      <path d="M13.2 6.6 C11.2 7.4, 9.0 8.6, 7.2 10.4" strokeWidth="1.3" />
      <path d="M8.8 9.6 C8.4 10.6, 9.0 11.3, 9.7 11.0 C10.6 10.5, 11.5 9.4, 12.2 8.4" strokeWidth="0.85" opacity="0.7" />
      <path d="M7.2 10.4 C6.6 10.8, 6.8 11.6, 7.4 11.4 C8.0 11.2, 8.6 10.7, 9.2 10.0" strokeWidth="1.0" />

      {/* Right arm extending outward in blessing */}
      <path d="M17.2 6.6 C18.8 7.4, 20.6 8.6, 22.0 10.4" strokeWidth="1.3" />
      <path d="M22.0 10.4 C22.5 10.8, 22.3 11.6, 21.7 11.4 C21.1 11.2, 20.5 10.7, 19.9 10.0" strokeWidth="1.0" />

      {/* Golden rays of grace streaming across the distance to Bernadette */}
      <line x1="7.6" y1="11.8" x2="5.6" y2="16.2" strokeWidth="0.7" stroke="#FEF08A" opacity="0.75" strokeDasharray="1.2 1.4" />
      <line x1="10.2" y1="11.8" x2="8.0" y2="17.0" strokeWidth="0.7" stroke="#FEF08A" opacity="0.75" strokeDasharray="1.2 1.4" />
      <line x1="12.8" y1="12.2" x2="10.5" y2="17.8" strokeWidth="0.7" stroke="#FEF08A" opacity="0.75" strokeDasharray="1.2 1.4" />
    </g>

    {/* Hover State 2: Saint Bernadette (one female child) kneeling reverently across the distance */}
    <g className="sanctum-lourdes-bernadette">
      {/* Rocky riverbank ground */}
      <path d="M1.5 22.5c3.5-.4 7.5-.4 10.5 0" strokeWidth="1.2" opacity="0.5" />

      {/* Bernadette's head with French Pyrenean peasant shawl/hood */}
      <circle cx="5.2" cy="15.8" r="1.15" strokeWidth="1.1" fill="currentColor" fillOpacity="0.18" />
      <path d="M4.2 16.5c-.3.8-.2 1.8.2 2.6" strokeWidth="0.9" />

      {/* Modest shawl & bodice */}
      <path d="M4.4 16.8c.4.8 1.0 1.4 1.8 1.6" strokeWidth="1.0" />

      {/* Small hands joined in prayer with taper/rosary point */}
      <path d="M5.8 17.4l1.2-.5" strokeWidth="1.0" />
      <circle cx="7.2" cy="16.8" r="0.4" fill="#FEF08A" stroke="none" />

      {/* Kneeling skirt on the riverbank */}
      <path d="M4.2 19.4c-.4.8-.2 1.6.4 2.2l-.6.6" strokeWidth="1.0" />
      <path d="M5.4 19.8l1.2.9l-.6 1.5" strokeWidth="1.0" />
      <path d="M3.2 22.2h5.0" strokeWidth="1.1" opacity="0.7" />
    </g>
  </svg>
);

/**
 * 8. Novena Tracker icon: Roman numeral IX with flickering fire on the top parts
 * as though the strokes of IX were lit liturgical candles.
 */
export const NovenaHands9Icon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Novena Tracker — Roman Numeral IX Flickering Candles"
  >
    <style>{`
      @keyframes sanctumFlameFlicker1 {
        0%, 100% { transform: translateY(0px) scale(1, 1) rotate(-2.5deg); opacity: 0.98; }
        35% { transform: translateY(-0.25px) scale(0.95, 1.07) rotate(3deg); opacity: 0.84; }
        70% { transform: translateY(0.15px) scale(1.04, 0.95) rotate(-3deg); opacity: 0.94; }
      }
      @keyframes sanctumFlameFlicker2 {
        0%, 100% { transform: translateY(-0.15px) scale(0.97, 1.05) rotate(2.5deg); opacity: 0.9; }
        40% { transform: translateY(0.15px) scale(1.04, 0.95) rotate(-3deg); opacity: 1; }
        75% { transform: translateY(-0.25px) scale(0.95, 1.07) rotate(2deg); opacity: 0.82; }
      }
      @keyframes sanctumFlameFlicker3 {
        0%, 100% { transform: translateY(0.1px) scale(1.03, 0.96) rotate(-2deg); opacity: 0.95; }
        30% { transform: translateY(-0.25px) scale(0.95, 1.06) rotate(3deg); opacity: 0.83; }
        65% { transform: translateY(0.1px) scale(1.03, 0.97) rotate(-2.5deg); opacity: 1; }
      }
      @keyframes sanctumHaloPulse {
        0%, 100% { opacity: 0.14; transform: scale(0.95); }
        50% { opacity: 0.28; transform: scale(1.08); }
      }
      .sanctum-flame-1,
      .sanctum-flame-2,
      .sanctum-flame-3 {
        transform-box: fill-box;
        transform-origin: 50% 100%;
      }
      .sanctum-halo-1,
      .sanctum-halo-2,
      .sanctum-halo-3 {
        transform-box: fill-box;
        transform-origin: 50% 50%;
        opacity: 0.14;
      }
      .group:hover .sanctum-flame-1,
      svg:hover .sanctum-flame-1 {
        animation: sanctumFlameFlicker1 0.9s infinite ease-in-out;
      }
      .group:hover .sanctum-flame-2,
      svg:hover .sanctum-flame-2 {
        animation: sanctumFlameFlicker2 0.78s infinite ease-in-out;
      }
      .group:hover .sanctum-flame-3,
      svg:hover .sanctum-flame-3 {
        animation: sanctumFlameFlicker3 1.02s infinite ease-in-out;
      }
      .group:hover .sanctum-halo-1,
      svg:hover .sanctum-halo-1 {
        animation: sanctumHaloPulse 0.9s infinite ease-in-out;
      }
      .group:hover .sanctum-halo-2,
      svg:hover .sanctum-halo-2 {
        animation: sanctumHaloPulse 0.78s infinite ease-in-out 0.15s;
      }
      .group:hover .sanctum-halo-3,
      svg:hover .sanctum-halo-3 {
        animation: sanctumHaloPulse 1.02s infinite ease-in-out 0.3s;
      }
    `}</style>

    {/* === GENTLE FLICKERING FIRE ON TOP OF "I" (x = 5.5) === */}
    <circle cx="5.5" cy="4.5" r="2.1" fill="#F59E0B" stroke="none" className="sanctum-halo-1" />
    <g className="sanctum-flame-1">
      {/* Outer flickering flame tongue */}
      <path
        d="M5.5 1.1C4.1 2.9 3.6 4.5 3.8 5.8c.2 1.0.9 1.6 1.7 1.6s1.5-.6 1.7-1.6C7.4 4.5 6.9 2.9 5.5 1.1Z"
        fill="#F59E0B"
        fillOpacity="0.7"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Inner white-gold hot flame core */}
      <path
        d="M5.5 3.3c-.5 1.0-.7 1.8-.5 2.5.1.5.3.8.5.8s.4-.3.5-.8c.2-.7 0-1.5-.5-2.5Z"
        fill="#FEF08A"
        stroke="none"
      />
    </g>

    {/* === GENTLE FLICKERING FIRE ON TOP-LEFT OF "X" (x = 12.0) === */}
    <circle cx="12.0" cy="4.5" r="2.1" fill="#F59E0B" stroke="none" className="sanctum-halo-2" />
    <g className="sanctum-flame-2">
      {/* Outer flickering flame tongue */}
      <path
        d="M12.0 1.1C10.6 2.9 10.1 4.5 10.3 5.8c.2 1.0.9 1.6 1.7 1.6s1.5-.6 1.7-1.6c.2-1.3-.3-2.9-1.7-4.7Z"
        fill="#F59E0B"
        fillOpacity="0.7"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Inner white-gold hot flame core */}
      <path
        d="M12.0 3.3c-.5 1.0-.7 1.8-.5 2.5.1.5.3.8.5.8s.4-.3.5-.8c.2-.7 0-1.5-.5-2.5Z"
        fill="#FEF08A"
        stroke="none"
      />
    </g>

    {/* === GENTLE FLICKERING FIRE ON TOP-RIGHT OF "X" (x = 19.0) === */}
    <circle cx="19.0" cy="4.5" r="2.1" fill="#F59E0B" stroke="none" className="sanctum-halo-3" />
    <g className="sanctum-flame-3">
      {/* Outer flickering flame tongue */}
      <path
        d="M19.0 1.1C17.6 2.9 17.1 4.5 17.3 5.8c.2 1.0.9 1.6 1.7 1.6s1.5-.6 1.7-1.6c.2-1.3-.3-2.9-1.7-4.7Z"
        fill="#F59E0B"
        fillOpacity="0.7"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Inner white-gold hot flame core */}
      <path
        d="M19.0 3.3c-.5 1.0-.7 1.8-.5 2.5.1.5.3.8.5.8s.4-.3.5-.8c.2-.7 0-1.5-.5-2.5Z"
        fill="#FEF08A"
        stroke="none"
      />
    </g>

    {/* === CANDLE WICKS === */}
    <line x1="5.5" y1="7.5" x2="5.5" y2="8.9" strokeWidth="1.2" />
    <line x1="12.0" y1="7.5" x2="12.0" y2="8.9" strokeWidth="1.2" />
    <line x1="19.0" y1="7.5" x2="19.0" y2="8.9" strokeWidth="1.2" />

    {/* === ROMAN NUMERAL "I" CANDLE (LEFT, WITHOUT SERIFS) === */}
    <line x1="5.5" y1="8.9" x2="5.5" y2="21.2" strokeWidth="2.2" />

    {/* === ROMAN NUMERAL "X" CANDLES (RIGHT, WITHOUT SERIFS) === */}
    <line x1="12.0" y1="8.9" x2="19.0" y2="21.2" strokeWidth="2.15" />
    <line x1="19.0" y1="8.9" x2="12.0" y2="21.2" strokeWidth="2.15" />
  </svg>
);

// Backward-compatible alias
export const NovenaHands1to9Icon = NovenaHands9Icon;

/**
 * 9. Bible study icon: A Bible with three lines on each side representing highlighting.
 * When hovered on, one highlighter sweeps across one line of the left page, making it very bright.
 */
export const BibleStudyHighlightedIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Bible Commentary — Highlighted Scripture"
  >
    {/* Open Bible Pages Outline */}
    <path d="M12 6.5C10 5 6.5 5 2 6v14c4.5-1 8-1 10 .5 2-1.5 5.5-1.5 10-.5V6c-4.5-1-8-1-10 .5z" strokeWidth="1.8" />
    {/* Center Spine */}
    <line x1="12" y1="6.5" x2="12" y2="20.5" strokeWidth="1.8" />

    {/* Three Base Lines on Left Page */}
    <line x1="4.5" y1="9.5" x2="9.5" y2="9.5" strokeWidth="1.8" />
    <line x1="4.5" y1="12.5" x2="9.5" y2="12.5" strokeWidth="1.8" />
    <line x1="4.5" y1="15.5" x2="8" y2="15.5" strokeWidth="1.8" />

    {/* Very Bright Highlighted Line on Left Page (drawn by the highlighter on hover) */}
    <line
      x1="4.5"
      y1="9.5"
      x2="9.5"
      y2="9.5"
      pathLength={10}
      stroke="#FEF08A"
      strokeWidth="3.1"
      className="sanctum-bible-highlight-glow"
    />
    <line
      x1="4.5"
      y1="9.5"
      x2="9.5"
      y2="9.5"
      pathLength={10}
      stroke="#FFFFFF"
      strokeWidth="1.9"
      className="sanctum-bible-highlight-core"
    />

    {/* Three Base Lines on Right Page */}
    <line x1="14.5" y1="9.5" x2="19.5" y2="9.5" strokeWidth="1.8" />
    <line x1="14.5" y1="12.5" x2="19.5" y2="12.5" strokeWidth="1.8" />
    <line x1="14.5" y1="15.5" x2="18" y2="15.5" strokeWidth="1.8" />

    {/* One Highlighter sweeping across the top line of the left page on hover */}
    <g className="sanctum-bible-highlighter">
      {/* Highlighter chisel tip at (4.5, 9.5) */}
      <path
        d="M4.2 9.6L5.2 7.5L6.5 8.5L4.9 9.8Z"
        fill="#FEF08A"
        stroke="#FDE047"
        strokeWidth="0.6"
      />
      {/* Highlighter barrel angled up-right */}
      <path
        d="M5.2 7.5L9.2 2.3a1.15 1.15 0 0 1 1.7 1.4L6.5 8.5Z"
        fill="currentColor"
        fillOpacity="0.22"
        stroke="currentColor"
        strokeWidth="1.45"
      />
    </g>
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
 * 11. Prayer Requests icon: One person at rest.
 * When hovered on, two more persons approach from each side toward the center to join in prayer.
 */
export const ThreePersonsPrayingIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Prayer Requests — One Person Joined by Two Approaching in Prayer"
  >
    {/* Center Person (Always present at center, praying reverently) */}
    <g className="sanctum-prayer-person-center">
      <circle cx="12" cy="5.5" r="2.4" />
      <path d="M8.5 20v-4.5a3.5 3.5 0 0 1 7 0V20" />
      {/* Hands folded in prayer */}
      <path d="M10.8 13.2l1.2-1.6 1.2 1.6" strokeWidth="1.4" />
    </g>

    {/* Left Person (approaches from the left toward the center on hover) */}
    <g className="sanctum-prayer-person-left">
      <circle cx="5.5" cy="7.2" r="2.0" />
      <path d="M2.5 20v-3.6a3 3 0 0 1 3-3h.8" />
      {/* Reaching arm clasping hand with the center person */}
      <path d="M5.8 14.6c2.0 0.8 3.8 0.6 5.8-0.5" strokeWidth="1.5" />
    </g>

    {/* Right Person (approaches from the right toward the center on hover) */}
    <g className="sanctum-prayer-person-right">
      <circle cx="18.5" cy="7.2" r="2.0" />
      <path d="M17.7 13.4h.8a3 3 0 0 1 3 3V20" />
      {/* Reaching arm clasping hand with the center person */}
      <path d="M18.2 14.6c-2.0 0.8-3.8 0.6-5.8-0.5" strokeWidth="1.5" />
    </g>
  </svg>
);

/**
 * 12. Catholic Podcasts icon: Outline of headphones with audio waveforms
 * that pass across the headphones when hovered on.
 */
export const CatholicPodcastNavIcon: React.FC<IconProps> = ({ className = 'w-4 h-4' }) => {
  const rawId = React.useId();
  const clipId = `sanctum-podcast-wave-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`${className} overflow-visible`}
      aria-label="Catholic Podcasts Headphones with Waveforms"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="3.4" y="4.5" width="17.2" height="16.2" rx="2" />
        </clipPath>
      </defs>

      {/* Audio waveforms passing horizontally across the headphones */}
      <g clipPath={`url(#${clipId})`}>
        <path
          d="M -11.0 13.5 L -9.0 13.5 L -7.8 11.5 L -6.5 15.5 L -5.0 8.2 L -3.4 18.8 L -1.8 9.5 L -0.2 17.5 L 1.2 11.5 L 2.5 15.2 L 3.6 13.5 L 5.0 13.5 L 6.2 11.5 L 7.5 15.5 L 9.0 8.2 L 10.6 18.8 L 12.2 9.5 L 13.8 17.5 L 15.2 11.5 L 16.5 15.2 L 17.6 13.5 L 19.0 13.5 L 20.2 11.5 L 21.5 15.5 L 23.0 8.2"
          strokeWidth="1.45"
          className="sanctum-podcast-waveform-track"
        />
      </g>

      {/* Headband arch */}
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      {/* Left and right earcups outline */}
      <path
        d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"
        fill="currentColor"
        fillOpacity="0.16"
      />
    </svg>
  );
};

/**
 * 13. Eucharistic Miracles Nav Icon: Monstrance outline.
 * When hovered on, a white Host appears in the middle of the monstrance and Blood appears on it.
 */
export const EucharisticMonstranceNavIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Eucharistic Monstrance — Eucharistic Miracle"
  >
    {/* Top Cross */}
    <path d="M12 1.5v2.5M10.8 2.7h2.4" strokeWidth="1.5" />
    {/* Sunburst Rays */}
    <path d="M12 4.5v1M12 14.5v1M7 9.5H6M18 9.5h-1M8.5 6l-.8-.8M16.3 13.8l-.8-.8M15.5 6l.8-.8M7.7 13.8l.8-.8" strokeWidth="1.3" />
    {/* Outer Lunette Frame */}
    <circle cx="12" cy="9.5" r="4.2" strokeWidth="1.7" />

    {/* Resting Glass Lunette (subtle inner ring when host is not present) */}
    <circle cx="12" cy="9.5" r="2.6" strokeWidth="1.0" opacity="0.35" />

    {/* White Sacred Host appearing in the middle of the monstrance on hover */}
    <circle
      cx="12"
      cy="9.5"
      r="2.65"
      fill="#FFFFFF"
      stroke="#E5E7EB"
      strokeWidth="0.45"
      className="sanctum-miracle-host"
    />

    {/* Precious Blood appearing on the white Host on hover */}
    <g className="sanctum-miracle-blood">
      {/* Central Eucharistic Blood stain / living tissue */}
      <path
        d="M11.1 8.7c-.5.4-.6 1.1-.2 1.6.4.5 1.1.7 1.6.5.6-.2.9-.8.7-1.4-.2-.6-.7-.8-1.2-1-.3-.2-.6-.1-.9.3z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="0.3"
      />
      {/* Bleeding droplet trickling down the Host */}
      <path
        d="M12.1 10.6c0 .6.4 1.1.1 1.4-.3.2-.6-.1-.6-.6 0-.4.3-.7.5-.8z"
        fill="#B91C1C"
        stroke="none"
      />
      {/* Fresh crimson droplet on the Host */}
      <circle cx="12.9" cy="9.3" r="0.42" fill="#EF4444" stroke="#991B1B" strokeWidth="0.2" />
    </g>

    {/* Stem, Knop and Pedestal Base */}
    <path d="M12 13.7v4.8" strokeWidth="1.8" />
    <circle cx="12" cy="16.2" r="1.1" fill="currentColor" />
    <path d="M8.5 21.5c1-1.8 2.2-2.7 3.5-2.7s2.5.9 3.5 2.7" strokeWidth="1.7" />
    <line x1="7.5" y1="21.5" x2="16.5" y2="21.5" strokeWidth="1.8" />
  </svg>
);

/**
 * 14. Spiritual Checklist Icon: A notebook with a ballpen
 * Depicts a neat bound notebook with ruled lines, margin, and a sleek ballpen with pen clip and nib.
 * When hovered on, the ballpen animates to write a checkmark on the notebook page.
 */
export const NotebookWithBallpenIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.7" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={`${className} overflow-visible`}
    aria-label="Notebook with Ballpen"
  >
    {/* Notebook Cover and Pages */}
    <rect x="3.5" y="3" width="13" height="18" rx="2" strokeWidth="1.7" />
    {/* Spiral / Left binding seam */}
    <line x1="6.5" y1="3" x2="6.5" y2="21" strokeWidth="1.2" opacity="0.65" />
    <path d="M2.5 6.5h2M2.5 10.5h2M2.5 14.5h2M2.5 18.5h2" strokeWidth="1.4" />
    {/* Ruled lines on page */}
    <line x1="8.8" y1="6.8" x2="13.8" y2="6.8" strokeWidth="1.25" opacity="0.8" />
    <line x1="8.8" y1="9.3" x2="13.2" y2="9.3" strokeWidth="1.25" opacity="0.8" />
    <line x1="8.8" y1="18.0" x2="14.2" y2="18.0" strokeWidth="1.2" opacity="0.6" />

    {/* Checkmark drawn on the notebook by the ballpen when hovered */}
    <path
      d="M8.8 13.8L10.6 15.8L14.4 11.2"
      pathLength={10}
      strokeWidth="1.95"
      className="sanctum-checklist-mark"
    />

    {/* Ballpen angled on the right side (animates across checkmark on hover) */}
    <g className="sanctum-checklist-pen">
      {/* Pen body and cone tip */}
      <path 
        d="M19.8 2.2a1.3 1.3 0 0 1 1.8 1.8L15.3 10.3l-2.6.9.9-2.6L19.8 2.2z" 
        strokeWidth="1.6" 
        fill="currentColor" 
        fillOpacity="0.12" 
      />
      {/* Ballpen tip ballpoint */}
      <circle cx="12.6" cy="11.2" r="0.45" fill="currentColor" stroke="none" />
      {/* Ballpen clip */}
      <path d="M18.8 3.2l-1.3 1.3" strokeWidth="1.3" />
    </g>
  </svg>
);

/**
 * 15. In Memoriam Icon: Holy Water
 * Depicts Holy Water inside a square container (bottle/vessel) with a Cross at the center.
 */
export const HolyWaterIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Holy Water — In Memoriam"
  >
    <g className="sanctum-holy-water-turn">
      {/* Bottle neck & cap at top of the square container */}
      <path d="M9.5 5.5V3h5v2.5" strokeWidth="1.7" />
      <line x1="8.5" y1="3" x2="15.5" y2="3" strokeWidth="1.8" />

      {/* Square container body */}
      <rect
        x="4"
        y="5.5"
        width="16"
        height="16"
        rx="1.8"
        strokeWidth="1.85"
      />

      {/* Holy Water inside the square container (subtle water surface wave + fill) */}
      <path
        d="M4.2 10.2c2.6-1.0 5.2 1.0 7.8 0 2.6-1.0 5.2 1.0 7.8 0V20a1.3 1.3 0 0 1-1.3 1.3H5.5A1.3 1.3 0 0 1 4.2 20v-9.8Z"
        fill="currentColor"
        fillOpacity="0.14"
        stroke="none"
      />
      <path
        d="M4.2 10.2c2.6-1.0 5.2 1.0 7.8 0 2.6-1.0 5.2 1.0 7.8 0"
        strokeWidth="1.35"
        opacity="0.75"
      />

      {/* Sacred Cross at the center of the square container */}
      <line x1="12" y1="9.2" x2="12" y2="18.2" strokeWidth="1.9" />
      <line x1="8.5" y1="12.8" x2="15.5" y2="12.8" strokeWidth="1.9" />
    </g>
  </svg>
);

/**
 * 16. Quotations Icon: The quotation marks first face each other, then on hover
 * one quotation mark (from the right) joins the one at the left and faces the right side.
 */
export const QuotationsRightFacingIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.65"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Quotations — Quotation Marks"
  >
    {/* Left quotation mark at the left, facing right */}
    <path
      d="M8.1 16.8C5.7 16.5 4.2 14.8 4.2 11.5V8.2c0-1 .7-1.7 1.7-1.7h1.6c1 0 1.7.7 1.7 1.7v2.4c0 .9-.7 1.6-1.6 1.6H6.5c.1 1.6.8 2.5 2.2 2.8v1.8h-.6z"
      className="sanctum-quote-left-mark"
    />
    {/* Right quotation mark: starts on the right facing left (facing the left mark), then on hover joins the left mark and faces the right side */}
    <path
      d="M15.3 16.8c-2.4-.3-3.9-2.0-3.9-5.3V8.2c0-1 .7-1.7 1.7-1.7h1.6c1 0 1.7.7 1.7 1.7v2.4c0 .9-.7 1.6-1.6 1.6h-1.1c.1 1.6.8 2.5 2.2 2.8v1.8h-.6z"
      className="sanctum-quote-right-mark"
    />
  </svg>
);

/**
 * 17. Mass Readings Icon: Open Lectionary Book that flips a page when hovered on
 */
export const MassReadingsBookFlipIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Mass Readings — Open Lectionary Book"
  >
    {/* Left Open Page */}
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    {/* Right Open Base Page (remains visible beneath the flipping page leaf) */}
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />

    {/* Flipping Right Page Leaf (pivots across the spine x=12 from right to left on hover) */}
    <g className="sanctum-book-flip-page">
      <path
        d="M12 7a4 4 0 0 1 4-4h5.6v14.5H15a3 3 0 0 0-3 3V7z"
        fill="currentColor"
        fillOpacity="0.14"
        strokeWidth="1.65"
      />
      {/* Delicate Lectionary text lines on the flipping page */}
      <line x1="14.6" y1="7.5" x2="19.2" y2="7.5" strokeWidth="1.2" opacity="0.75" />
      <line x1="14.6" y1="10.8" x2="19.2" y2="10.8" strokeWidth="1.2" opacity="0.75" />
      <line x1="14.6" y1="14.1" x2="18.2" y2="14.1" strokeWidth="1.2" opacity="0.75" />
    </g>
  </svg>
);

/**
 * 18. Timeline of the Church Icon: Vertical timeline that scrolls up
 * from 30 to 49 to 64 and to 107 AD when hovered on.
 */
export const ChurchTimelineIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  const rawId = React.useId();
  const clipId = `sanctum-timeline-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible`}
      aria-label="Timeline of the Church — 30 to 107 AD"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="-1" y="0.5" width="26" height="23" rx="2" />
        </clipPath>
      </defs>

      {/* Clipped scrolling timeline container */}
      <g clipPath={`url(#${clipId})`}>
        <g className="sanctum-timeline-scroll">
          {/* Continuous vertical timeline axis */}
          <line x1="2.8" y1="2" x2="2.8" y2="82" strokeWidth="1.4" stroke="currentColor" opacity="0.65" />

          {/* 1. Milestone 30 AD (Crucifixion, Resurrection & Pentecost) */}
          <circle cx="2.8" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <text
            x="5.8"
            y="13.9"
            fontSize="5.5"
            fontWeight="900"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fill="currentColor"
            stroke="none"
          >
            30 AD
          </text>

          {/* 2. Milestone 49 AD (Council of Jerusalem) */}
          <circle cx="2.8" cy="32" r="1.5" fill="currentColor" stroke="none" />
          <text
            x="5.8"
            y="33.9"
            fontSize="5.5"
            fontWeight="900"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fill="currentColor"
            stroke="none"
          >
            49 AD
          </text>

          {/* 3. Milestone 64 AD (Nero's Persecution & Peter & Paul) */}
          <circle cx="2.8" cy="52" r="1.5" fill="currentColor" stroke="none" />
          <text
            x="5.8"
            y="53.9"
            fontSize="5.5"
            fontWeight="900"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fill="currentColor"
            stroke="none"
          >
            64 AD
          </text>

          {/* 4. Milestone 107 AD (St. Ignatius of Antioch - Katholike Ekklesia) */}
          <circle cx="2.8" cy="72" r="1.7" fill="#FEF08A" stroke="currentColor" strokeWidth="0.6" />
          <text
            x="5.8"
            y="73.9"
            fontSize="5.4"
            fontWeight="900"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fill="#FEF08A"
            stroke="none"
          >
            107 AD
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * 19. Visio Divina Icon: Eye that blinks slowly when hovered on
 */
export const VisioDivinaEyeBlinkIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.85"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Visio Divina — Contemplative Eye"
  >
    <g className="sanctum-eye-blink">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </svg>
);

/**
 * 20. Bible Flashcards Icon: Vertical rectangle with a check mark in the middle.
 * When hovered on, another flashcard from the top goes to the front.
 */
export const BibleFlashcardsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Bible Flashcards"
  >
    {/* Base Flashcard (recedes to the back when the top flashcard comes to the front on hover) */}
    <g className="sanctum-flashcard-base">
      <rect
        x="5.5"
        y="3.5"
        width="13"
        height="17"
        rx="2"
        strokeWidth="1.8"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path
        d="M9.2 12.2L11.2 14.2L15.0 10.0"
        strokeWidth="1.95"
      />
    </g>

    {/* Top Flashcard that slides down from the top to the front when hovered on */}
    <g className="sanctum-flashcard-top">
      {/* Solid dark backing so the incoming flashcard visibly covers the back card as it comes to the front */}
      <rect
        x="5.5"
        y="3.5"
        width="13"
        height="17"
        rx="2"
        fill="#1c1613"
        stroke="none"
      />
      <rect
        x="5.5"
        y="3.5"
        width="13"
        height="17"
        rx="2"
        strokeWidth="1.85"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path
        d="M9.2 12.2L11.2 14.2L15.0 10.0"
        strokeWidth="2.0"
      />
    </g>
  </svg>
);

/**
 * 21. Spiritual Classics Icon: Four books on a shelf.
 * On hover, the first three books stack to the left side, and the fourth (last) book
 * slides in and tilts left to lean on the three books.
 */
export const SpiritualClassicsBooksIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Spiritual Classics — Four Books Stacking to the Left"
  >
    {/* Shelf base line */}
    <line x1="1.5" y1="21" x2="22.5" y2="21" strokeWidth="1.75" />

    {/* Book 1: Leftmost upright book */}
    <g className="sanctum-classics-book-1">
      <rect x="2.2" y="5.5" width="3.2" height="15.5" rx="0.55" strokeWidth="1.6" />
      <line x1="3.8" y1="8.2" x2="3.8" y2="13.5" strokeWidth="1.15" />
    </g>

    {/* Book 2: Second upright book (stacks to the left against Book 1 on hover) */}
    <g className="sanctum-classics-book-2">
      <rect x="5.8" y="4.2" width="3.2" height="16.8" rx="0.55" strokeWidth="1.6" />
      <line x1="7.4" y1="7.2" x2="7.4" y2="12.8" strokeWidth="1.15" />
    </g>

    {/* Book 3: Third upright book (stacks to the left against Book 2 on hover) */}
    <g className="sanctum-classics-book-3">
      <rect x="9.4" y="5.0" width="3.2" height="16.0" rx="0.55" strokeWidth="1.6" />
      <line x1="11.0" y1="8.0" x2="11.0" y2="13.2" strokeWidth="1.15" />
    </g>

    {/* Book 4: Fourth (last) book (slides left and tilts to lean on the three books on hover) */}
    <g className="sanctum-classics-book-4">
      <rect x="16.7" y="5.2" width="3.2" height="15.8" rx="0.55" strokeWidth="1.6" />
      <line x1="18.3" y1="8.2" x2="18.3" y2="13.4" strokeWidth="1.15" />
    </g>
  </svg>
);

/**
 * 22. Holy Mass Live Icon: Clean TV outline that slowly turns once when hovered on.
 */
export const HolyMassLiveTvAltarIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Holy Mass Live — TV"
  >
    <g className="sanctum-tv-turn">
      {/* TV Antenna */}
      <polyline points="17 2 12 7 7 2" />

      {/* TV Screen Frame */}
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    </g>
  </svg>
);

/**
 * 23. Vatican News Icon: Outline of St. Peter's Basilica.
 * When hovered on, the basilica slowly turns once around its vertical axis.
 */
export const StPetersBasilicaIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.65"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Vatican News — St. Peter's Basilica"
  >
    <g className="sanctum-basilica-turn">
      {/* Papal Cross & Lantern atop Michelangelo's Dome */}
      <line x1="12" y1="1.3" x2="12" y2="3.8" strokeWidth="1.45" />
      <line x1="10.7" y1="2.2" x2="13.3" y2="2.2" strokeWidth="1.4" />
      <path d="M10.9 3.8h2.2v1.4h-2.2z" strokeWidth="1.25" />

      {/* Great Ribbed Dome of St. Peter's Basilica */}
      <path
        d="M6.2 10.8 C6.2 7.2, 8.6 5.2, 12 5.2 C15.4 5.2, 17.8 7.2, 17.8 10.8"
        strokeWidth="1.65"
        fill="currentColor"
        fillOpacity="0.08"
      />
      {/* Dome structural ribs */}
      <path d="M9.2 10.8 C9.4 8.2, 10.4 6.2, 11.3 5.3" strokeWidth="1.0" opacity="0.7" />
      <path d="M14.8 10.8 C14.6 8.2, 13.6 6.2, 12.7 5.3" strokeWidth="1.0" opacity="0.7" />
      {/* Dome drum cornice */}
      <line x1="5.6" y1="10.8" x2="18.4" y2="10.8" strokeWidth="1.5" />

      {/* Flanking Minor Cupolas on left and right */}
      <path d="M3.4 13.5 C3.4 11.9, 4.0 11.1, 4.7 11.1 C5.4 11.1, 6.0 11.9, 6.0 13.5" strokeWidth="1.3" />
      <path d="M18.0 13.5 C18.0 11.9, 18.6 11.1, 19.3 11.1 C20.0 11.1, 20.6 11.9, 20.6 13.5" strokeWidth="1.3" />

      {/* Maderno Facade Entablature & Central Triangular Pediment */}
      <line x1="2.4" y1="13.5" x2="21.6" y2="13.5" strokeWidth="1.6" />
      <path
        d="M8.2 13.5 L12 11.3 L15.8 13.5"
        strokeWidth="1.45"
        fill="currentColor"
        fillOpacity="0.14"
      />

      {/* Facade Colonnade Pillars & Outer Walls */}
      <line x1="3.0" y1="13.5" x2="3.0" y2="20.8" strokeWidth="1.6" />
      <line x1="6.8" y1="13.5" x2="6.8" y2="20.8" strokeWidth="1.35" />
      <line x1="17.2" y1="13.5" x2="17.2" y2="20.8" strokeWidth="1.35" />
      <line x1="21.0" y1="13.5" x2="21.0" y2="20.8" strokeWidth="1.6" />

      {/* Central Arched Portal */}
      <path
        d="M9.8 20.8v-3.5a2.2 2.2 0 0 1 4.4 0v3.5"
        strokeWidth="1.5"
        fill="currentColor"
        fillOpacity="0.15"
      />

      {/* Piazza San Pietro Stepped Base */}
      <line x1="1.8" y1="20.8" x2="22.2" y2="20.8" strokeWidth="1.75" />
    </g>
  </svg>
);

/**
 * 24. Catholic Glossary Icon: A book with a bookmark ribbon.
 * When hovered on, a definition (a horizontal line of words) goes out from the book.
 */
export const CatholicGlossaryBookIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Catholic Glossary — Book with Emerging Definition"
  >
    {/* Bookmark ribbon at top of glossary book */}
    <path d="M8.2 2.5v6.5l2.3-2.2 2.3 2.2V2.5" />

    {/* Glossary Book Outline */}
    <path d="M3.2 19.2V4.8A2.3 2.3 0 0 1 5.5 2.5H16.2a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H5.5a2.2 2.2 0 0 1 0-4.4H17.2" />

    {/* Definition (a line of words: "term : word word") that goes out from the book on hover */}
    <g className="sanctum-glossary-definition-line">
      {/* Subtle dark backing across the book edge so the emerging line of words cleanly passes out of the book */}
      <rect
        x="11.0"
        y="11.1"
        width="12.8"
        height="2.8"
        rx="1.2"
        fill="#1c1613"
        stroke="none"
      />
      {/* Headword / Term segment */}
      <line x1="11.6" y1="12.5" x2="14.2" y2="12.5" stroke="#FEF08A" strokeWidth="2.0" />
      {/* Definition colon separator */}
      <circle cx="15.6" cy="11.9" r="0.42" fill="#FEF08A" stroke="none" />
      <circle cx="15.6" cy="13.1" r="0.42" fill="#FEF08A" stroke="none" />
      {/* Definition word segments going out from the book */}
      <line x1="17.0" y1="12.5" x2="19.8" y2="12.5" stroke="currentColor" strokeWidth="1.85" />
      <line x1="21.1" y1="12.5" x2="23.5" y2="12.5" stroke="currentColor" strokeWidth="1.85" />
    </g>
  </svg>
);

/**
 * 25. Church Calendar Icon: Liturgical calendar with top binding rings.
 * When hovered on, the front page slowly flips back over the top to reveal the next month/page beneath.
 */
export const ChurchCalendarPageFlipIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} overflow-visible`}
    aria-label="Church Calendar — Page Flipping Back"
  >
    {/* Base plate / Back calendar page (revealed as the front page flips back) */}
    <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="1.8" />
    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.6" />

    {/* Liturgical Feast Day Cross on revealed page */}
    <line x1="12" y1="11.8" x2="12" y2="17.8" stroke="#FEF08A" strokeWidth="1.65" />
    <line x1="9.6" y1="13.8" x2="14.4" y2="13.8" stroke="#FEF08A" strokeWidth="1.65" />

    {/* Date markers on revealed back page */}
    <circle cx="6.5" cy="13.8" r="0.8" fill="currentColor" />
    <circle cx="17.5" cy="13.8" r="0.8" fill="currentColor" />
    <circle cx="6.5" cy="17.2" r="0.8" fill="currentColor" />
    <circle cx="17.5" cy="17.2" r="0.8" fill="currentColor" />

    {/* Front Calendar Page (slowly flips back over the top binding on hover) */}
    <g className="sanctum-calendar-front-page">
      {/* Solid dark backing so front page covers the back page while resting */}
      <rect x="3.2" y="4.2" width="17.6" height="16.6" rx="1.8" fill="#1c1613" stroke="none" />
      {/* Front page outline and header */}
      <rect x="3" y="4" width="18" height="17" rx="2" strokeWidth="1.8" fill="currentColor" fillOpacity="0.14" />
      <line x1="3" y1="9" x2="21" y2="9" strokeWidth="1.6" />
      {/* Front page date grid / text lines */}
      <line x1="6.2" y1="12.8" x2="10.8" y2="12.8" strokeWidth="1.35" opacity="0.85" />
      <line x1="13.2" y1="12.8" x2="17.8" y2="12.8" strokeWidth="1.35" opacity="0.85" />
      <line x1="6.2" y1="16.2" x2="10.8" y2="16.2" strokeWidth="1.35" opacity="0.85" />
      <line x1="13.2" y1="16.2" x2="17.8" y2="16.2" strokeWidth="1.35" opacity="0.85" />
    </g>

    {/* Top Binder Rings / Posts (stay on top of both pages) */}
    <line x1="8" y1="1.8" x2="8" y2="5.8" strokeWidth="2.2" />
    <line x1="16" y1="1.8" x2="16" y2="5.8" strokeWidth="2.2" />
  </svg>
);

/**
 * 26. Sacred Art Gallery Icon:
 * Displays a framed sacred canvas at the center. When hovered on,
 * another image from the right smoothly replaces the image at the center.
 */
export const SacredArtGallerySwapIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => {
  const rawId = React.useId();
  const clipId = `sanctum-gallery-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} overflow-visible`}
      aria-label="Sacred Art Gallery — Images Swapping"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="24" height="24" rx="2.5" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clipId})`}>
        {/* Image 1: Centered canvas at rest (slides out to the left on hover) */}
        <g className="sanctum-gallery-image-center">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2.2"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.08"
          />
          {/* Celestial Sun / Halo in Artwork 1 */}
          <circle cx="8.5" cy="8.5" r="2.2" strokeWidth="1.4" />
          {/* Sacred Vista / Mountain hills */}
          <path d="M21 16l-4.5-4.5a2 2 0 0 0-2.8 0L6 19.5" strokeWidth="1.5" />
          <path d="M3.5 17.5l3.5-3.5a1.8 1.8 0 0 1 2.5 0l2 2" strokeWidth="1.3" opacity="0.75" />
        </g>

        {/* Image 2: Incoming sacred canvas from the right (slides in to the center on hover) */}
        <g className="sanctum-gallery-image-right">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2.2"
            strokeWidth="1.8"
            fill="currentColor"
            fillOpacity="0.14"
          />
          {/* Sacred Altar Cross with Gold Radiant Glory in Artwork 2 */}
          <circle cx="12" cy="10" r="4.2" strokeWidth="1.15" stroke="#FEF08A" opacity="0.7" />
          <line x1="12" y1="5.2" x2="12" y2="17.2" strokeWidth="1.65" />
          <line x1="8.5" y1="8.8" x2="15.5" y2="8.8" strokeWidth="1.65" />
          {/* Altar Pedestal Base Line */}
          <line x1="6.5" y1="18.8" x2="17.5" y2="18.8" strokeWidth="1.35" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
};








