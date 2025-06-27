import React from "react";

interface ShimmerEffectProps {
  show: boolean;
}

const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div 
      className="absolute inset-0 opacity-0 animate-shimmer"
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
        animation: 'shimmer 20s linear'
      }}
    />
  );
};

export default ShimmerEffect;