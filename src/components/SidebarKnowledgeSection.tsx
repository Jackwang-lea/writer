import { Icon } from '@iconify/react';

interface SidebarKnowledgeSectionProps {
  onKnowledgeItemClick: () => void;
  showToast: () => void;
}

function SidebarKnowledgeSection({ onKnowledgeItemClick, showToast }: SidebarKnowledgeSectionProps) {
  return (
    <div className="font-bold text-lg mt-6 mb-2 flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
      <span 
        className="cursor-pointer flex items-center" 
        onClick={() => onKnowledgeItemClick()}
      >
        <Icon 
          icon="ri:arrow-right-s-line" 
          className="w-5 h-5 mr-1 text-gray-500"
        />
        知识库
      </span>
      <Icon 
        icon="ri:add-line" 
        className="w-5 h-5 text-gray-500 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          showToast();
        }}
      />
    </div>
  );
}

export default SidebarKnowledgeSection; 