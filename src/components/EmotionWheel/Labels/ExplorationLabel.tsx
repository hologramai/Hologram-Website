import React from "react";

interface ExplorationLabelProps {
  x: number;
  y: number;
  isSelected: boolean;
  intensity: number;
}

const ExplorationLabel: React.FC<ExplorationLabelProps> = ({ x, y, isSelected, intensity }) => {
  return (
    <div
      className="absolute transform -translate-x-[60%] translate-y-[20%] pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <div
        className={`text-sm font-bold text-white bg-pink-500 px-3 py-1.5 rounded-lg whitespace-nowrap ${
          isSelected && intensity <= 50 ? 'ring-2 ring-white scale-110 bg-pink-700' : ''
        }`}
        style={{ transition: 'all 0.2s ease' }}
      >
        Exploration
      </div>
    </div>
  );
};

export default ExplorationLabel;