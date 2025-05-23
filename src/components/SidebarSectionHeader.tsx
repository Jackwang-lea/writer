import React from 'react';
import { Icon } from '@iconify/react';

interface SidebarSectionHeaderProps {
  title: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onAdd?: (e: React.MouseEvent) => void;
  className?: string;
}

const SidebarSectionHeader: React.FC<SidebarSectionHeaderProps> = ({
  title,
  isExpanded,
  onToggleExpand,
  onAdd,
  className = ''
}) => {
  return (
    <div className={`font-bold text-lg mt-6 mb-2 flex justify-between items-center hover:bg-gray-50 p-2 rounded-md ${className}`}>
      <span 
        className="cursor-pointer flex items-center" 
        onClick={onToggleExpand}
      >
        <Icon 
          icon={isExpanded ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"} 
          className="w-5 h-5 mr-1 text-gray-500"
        />
        {title}
      </span>
      {onAdd && (
        <Icon 
          icon="ri:add-line" 
          className="w-5 h-5 text-gray-500 cursor-pointer"
          onClick={onAdd}
        />
      )}
    </div>
  );
};

export default SidebarSectionHeader; 