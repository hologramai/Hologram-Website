import React from "react";
import { WHEEL_SIZE } from "./constants";

interface CursorIndicatorProps {
  position: { x: number; y: number } | null;
}

const CursorIndicator: React.FC<CursorIndicatorProps> = ({ position }) => {
  if (!position) return null;

  const centerOffset = WHEEL_SIZE / 2;

  return (
    <div 
      className="absolute w-6 h-6 bg-white rounded-full shadow-lg border-2 border-gray-800 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x + centerOffset}px`,
        top: `${position.y + centerOffset}px`,
        transition: 'none'
      }}
    />
  );
};

export default CursorIndicator;