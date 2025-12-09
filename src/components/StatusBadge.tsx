import React from 'react';

interface StatusBadgeProps {
  status: 'TML' | 'NTML';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isTML = status === 'TML';

  return (
    <span className={\`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold \${
      isTML
        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        : 'bg-blue-100 text-blue-800 border border-blue-200'
    }\`}>
      {isTML ? 'TML Listed Company' : 'NTML Good Listed Company'}
    </span>
  );
};

export default StatusBadge;
