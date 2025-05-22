import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

interface SidebarKnowledgeSectionProps {
  onKnowledgeItemClick?: () => void;
}

// 知识库子项类型
interface KnowledgeItem {
  id: string;
  name: string;
}

function SidebarKnowledgeSection({ onKnowledgeItemClick }: SidebarKnowledgeSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // 知识库子项列表
  const knowledgeItems: KnowledgeItem[] = [
    { id: 'knowledge-1', name: '测试' },
    { id: 'knowledge-2', name: '对话记录' },
    { id: 'knowledge-3', name: '角色剧本' },
    { id: 'knowledge-4', name: '大纲' }
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onKnowledgeItemClick) {
      onKnowledgeItemClick();
    }
  };

  const handleAddKnowledge = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/knowledge/new');
  };

  return (
    <div>
      <div className="font-bold text-lg mt-6 mb-2 flex justify-between items-center hover:bg-gray-50 p-2 rounded-md">
        <span 
          className="cursor-pointer flex items-center" 
          onClick={toggleExpand}
        >
          <Icon 
            icon={isExpanded ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"} 
            className="w-5 h-5 mr-1 text-gray-500"
          />
          知识库
        </span>
        <Icon 
          icon="ri:add-line" 
          className="w-5 h-5 text-gray-500 cursor-pointer"
          onClick={handleAddKnowledge}
        />
      </div>

      {/* 展开时显示子项目 */}
      {isExpanded && (
        <div className="ml-7 space-y-2 mt-2">
          {knowledgeItems.map(item => (
            <div 
              key={item.id} 
              className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded"
              onClick={() => navigate(`/knowledge/${item.id}`)}
            >
              <Icon 
                icon="ri:file-list-line" 
                className="w-5 h-5 mr-2 text-gray-500"
              />
              <span className="flex-grow">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarKnowledgeSection; 