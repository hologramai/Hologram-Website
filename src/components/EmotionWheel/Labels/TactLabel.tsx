import React from "react";

interface TactLabelProps {
  x: number;
  y: number;
  isSelected: boolean;
  intensity: number;
}

const TactLabel: React.FC<TactLabelProps> = ({ x, y, isSelected, intensity }) => {
  // No vertical adjustment needed - aligned with Sass
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div
        className={`text-sm font-bold text-white bg-gray-700 px-3 py-1.5 rounded-lg whitespace-nowrap ${
          isSelected && intensity > 50 ? 'ring-2 ring-white scale-110 bg-gray-900' : ''
        }`}
        style={{ transition: 'all 0.2s ease' }}
      >
        Tact
      </div>
    </div>
  );
};

export default TactLabel;