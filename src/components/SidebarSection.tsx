import React from 'react';
import { Icon } from '@iconify/react';

interface SidebarSectionProps {
  title: string;
  isExpanded?: boolean;
  onToggle?: () => void;
  onAdd?: () => void;
  showExpandIcon?: boolean;
  children?: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  isExpanded = false,
  onToggle,
  onAdd,
  showExpandIcon = true,
  children
}) => {
  return (
    <div>
      <div className="font-bold text-lg mt-6 mb-2 flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
        <span 
          className="cursor-pointer flex items-center" 
          onClick={onToggle}
        >
          {showExpandIcon && (
            <Icon 
              icon={isExpanded ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"} 
              className="w-5 h-5 mr-1 text-gray-500"
            />
          )}
          {title}
        </span>
        {onAdd && (
          <Icon 
            icon="ri:add-line" 
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
          />
        )}
      </div>
      {isExpanded && children}
    </div>
  );
};

export default SidebarSection; 