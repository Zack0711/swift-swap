import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'green' | 'blue' | 'gray' | 'red' | 'yellow';
  tooltip?: string;
  subtitle?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
  color,
  tooltip,
  subtitle
}) => {
  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      border: 'border-blue-200'
    },
    gray: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      icon: 'text-gray-600',
      border: 'border-gray-200'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: 'text-red-600',
      border: 'border-red-200'
    },
    yellow: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: 'text-yellow-600',
      border: 'border-yellow-200'
    }
  };

  const classes = colorClasses[color];

  return (
    <div
      className={`
        p-4 rounded-lg border transition-all duration-200 hover:shadow-sm
        ${classes.bg} ${classes.border}
      `}
      title={tooltip}
    >
      <div className="flex items-center space-x-3">
        <div className={`flex-shrink-0 ${classes.icon}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${classes.text}`}>
            {title}
          </p>
          <div className="flex items-baseline space-x-2 mt-1">
            <p className={`text-2xl font-bold ${classes.text}`}>
              {typeof value === 'number' && value < 1000 
                ? value 
                : typeof value === 'number' 
                ? value.toLocaleString() 
                : value
              }
            </p>
            {subtitle && (
              <p className={`text-xs ${classes.text} opacity-75`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;