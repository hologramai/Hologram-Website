import React from "react";

interface ShimmerEffectProps {
  show: boolean;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div 
      className="absolute inset-0 opacity-0"
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)',
        animation: 'shimmer 3s ease-in-out'
      }}
    />
  );
};

export default ShimmerEffect;