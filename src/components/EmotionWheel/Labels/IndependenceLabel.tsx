import React from "react";

interface IndependenceLabelProps {
  x: number;
  y: number;
  isSelected: boolean;
  intensity: number;
}

const IndependenceLabel: React.FC<IndependenceLabelProps> = ({ x, y, isSelected, intensity }) => {
  // Move up by 20px (same as Affection for balance)
  const adjustedY = y - 20;
  
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${adjustedY}px`,
      }}
    >
      <div
        className={`text-sm font-bold text-white bg-gray-700 px-3 py-1.5 rounded-lg whitespace-nowrap ${
          isSelected && intensity <= 50 ? 'ring-2 ring-white scale-110 bg-gray-900' : ''
        }`}
        style={{ transition: 'all 0.2s ease' }}
      >
        Independence
      </div>
    </div>
  );
};

export default IndependenceLabel;