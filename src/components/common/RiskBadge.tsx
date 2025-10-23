import React from 'react';

interface RiskBadgeProps {
  score: number;
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ score }) => {
  let bgColor = 'bg-green-100 text-green-800';
  let label = 'Low';

  if (score >= 0.4) {
    bgColor = 'bg-yellow-100 text-yellow-800';
    label = 'Medium';
  }
  if (score >= 0.7) {
    bgColor = 'bg-red-100 text-red-800';
    label = 'High';
  }
  if (score >= 0.9) {
    bgColor = 'bg-red-200 text-red-900 font-bold';
    label = 'Critical';
  }

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}
    >
      {label}
    </span>
  );
};

export default RiskBadge;