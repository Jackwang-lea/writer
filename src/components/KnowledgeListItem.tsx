import React from 'react';
import { Icon } from '@iconify/react';

interface KnowledgeListItemProps {
  id: string;
  name: string;
  icon?: string;
  onClick?: (id: string) => void;
  className?: string;
}

const KnowledgeListItem: React.FC<KnowledgeListItemProps> = ({
  id,
  name,
  icon = 'ri:file-list-line',
  onClick,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className={`flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded ${className}`}
      onClick={handleClick}
    >
      <Icon 
        icon={icon}
        className="w-5 h-5 mr-2 text-gray-500"
      />
      <span className="flex-grow">{name}</span>
    </div>
  );
};

export default KnowledgeListItem; 