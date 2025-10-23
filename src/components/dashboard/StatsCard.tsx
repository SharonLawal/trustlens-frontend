import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  colorClassName: string; // e.g., "bg-blue-500"
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  colorClassName,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 flex items-center space-x-4">
      <div className={`p-3 rounded-full ${colorClassName}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;