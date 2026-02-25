import React from 'react';

/**
 * Common props for all icons:
 * @param {number|string} size - Width and height of the icon (default: 24)
 * @param {string} className - Optional Tailwind or CSS classes
 */

export const PositionStatic = ({ size = 24, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="4" y="10" width="16" height="4" rx="1" fill="currentColor" />
    <rect x="4" y="16" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const PositionRelative = ({ size = 24, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="2 2" />
    <rect x="7" y="8" width="16" height="4" rx="1" fill="currentColor" />
    <rect x="4" y="16" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

export const PositionAbsolute = ({ size = 24, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Flow bars collapse together (no gap reserved) */}
    <rect x="4" y="5" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="4" y="10" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />
    <rect x="4" y="15" width="16" height="4" rx="1" fill="currentColor" fillOpacity="0.2" />

    {/* Absolute element floating independently with a 'cutout' stroke */}
    <rect x="11" y="8" width="9" height="9" rx="2" fill="currentColor" stroke="white" strokeWidth="2.5" />
    <path d="M12 9L15 9M12 9L12 12" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const PositionFixed = ({ size = 24, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
    <rect x="6" y="12" width="12" height="2" rx="0.5" fill="currentColor" fillOpacity="0.2" />
    <rect x="6" y="16" width="12" height="2" rx="0.5" fill="currentColor" fillOpacity="0.2" />
    <rect x="14" y="5" width="5" height="5" rx="1" fill="currentColor" />
  </svg>
);

export const PositionSticky = ({ size = 24, className = "", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
    <rect x="6" y="14" width="12" height="2" rx="0.5" fill="currentColor" fillOpacity="0.1" />
    <rect x="6" y="18" width="12" height="2" rx="0.5" fill="currentColor" fillOpacity="0.1" />
    <rect x="4" y="4" width="16" height="4" rx="1" fill="currentColor" />
  </svg>
);

// Optional: A Map object for dynamic rendering
export const PositionIcons = {
  static: PositionStatic,
  relative: PositionRelative,
  absolute: PositionAbsolute,
  fixed: PositionFixed,
  sticky: PositionSticky,
};



/**
 * DirectionalIcon Component
 * Renders a customizable 16x16 SVG icon based on the user sketch.
 */

type Direction = 'top' | 'right' | 'bottom' | 'left';

interface DirectionalIconProps extends React.SVGAttributes<SVGSVGElement> {
  direction?: Direction;
  outlineWidth?: number;
  indicatorWidth?: number;
}

export const DirectionalIcon: React.FC<DirectionalIconProps> = ({
  direction = 'top',
  outlineWidth = 1.5,
  indicatorWidth = 3,
  style,
  ...props
}) => {
  // Map directions to rotation degrees
  const rotationAngles: Record<Direction, number> = {
    top: 0,
    right: 90,
    bottom: 180,
    left: -90,
  };

  const angle = rotationAngles[direction] || 0;

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${angle}deg)`,
        ...style
      }}
      {...props}
    >
      {/* Simplified Square Outline */}
      <rect
        x="2.75"
        y="2.75"
        width="10.5"
        height="10.5"
        stroke="currentColor"
        strokeWidth={outlineWidth}
        opacity={.2}
      />

      {/* Direction Indicator Bar */}
      <line
        x1="2"
        y1="3.5"
        x2="14"
        y2="3.5"
        stroke="currentColor"
        strokeWidth={indicatorWidth}
        strokeLinecap="butt"
      />
    </svg>
  );
};