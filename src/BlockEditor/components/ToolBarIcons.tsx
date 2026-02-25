import React from 'react';
/**
 * TypographyIcon Component
 * Redesigned to match the geometric, linear style of the sidebar icons.
 * Uses a sans-serif stack for a cleaner, more modern look.
 */
export const TypographyIcon = ({ 
  size = 18, 
  color = "currentColor", 
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Typography settings icon"
    >
      {/* Text: Switched to Sans-Serif (Inter/System) 
          Matching the modern, clean weight of the grid/home icons.
      */}
      <text 
        x="9" 
        y="11" 
        textAnchor="middle" 
        fill={color} 
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif", 
          fontWeight: "600", 
          fontSize: "10px", 
          letterSpacing: "-0.2px"
        }}
      >
        Aa
      </text>
      
      {/* Horizontal Row Underneath: 
          Adjusted sizes for better visual balance at small scales.
      */}
      
      {/* Ghost circle: matching stroke weight of other linear icons */}
      <circle 
        cx="4.5" 
        cy="15.5" 
        r="1.2" 
        stroke={color} 
        strokeWidth="1.2" 
        fill="none" 
      />
      
      {/* Solid circle */}
      <circle 
        cx="9" 
        cy="15.5" 
        r="1.4" 
        fill={color} 
      />
      
      {/* Solid square */}
      <rect 
        x="12.2" 
        y="14.1" 
        width="2.8" 
        height="2.8" 
        fill={color} 
      />
    </svg>
  );
};

/**
 * FrameIcon Component (Redesigned)
 * Uses a "corner-mark" or "focus" metaphor for the Frame tool.
 * This is a cleaner, more geometric alternative to the hashtag symbol.
 */
export const FrameIcon = ({ 
  size = 18, 
  color = "currentColor", 
  strokeWidth = 1.6,
  className = "" 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 18 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Left Corner */}
      <path d="M3 7V3.5C3 3.22386 3.22386 3 3.5 3H7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      {/* Top Right Corner */}
      <path d="M11 3H14.5C14.7761 3 15 3.22386 15 3.5V7" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      {/* Bottom Right Corner */}
      <path d="M15 11V14.5C15 14.7761 14.7761 15 14.5 15H11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      {/* Bottom Left Corner */}
      <path d="M7 15H3.5C3.22386 15 3 14.7761 3 14.5V11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};


/**
 * Ghost Selection Pointer
 * - Points top-left (North-West)
 * - Clean outline style using currentColor for flexibility
 */
export const TaillessArrow = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{
      width: '20px',
      height: '20px',
      transform: 'rotate(12deg)', // Rotated slightly to the right
      transformOrigin: 'center'
    }}
  >
    <path d="M3 3l16 6-7 3-3 7-6-16z" stroke="currentColor" />
  </svg>
);