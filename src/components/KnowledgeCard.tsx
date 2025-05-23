import React from 'react';
import { Icon } from '@iconify/react';
import { KnowledgeBase } from '../hooks/useKnowledgeBase';

interface KnowledgeCardProps {
  knowledge: KnowledgeBase;
  isActive: boolean;
  onCardClick: (kb: KnowledgeBase) => void;
  onEdit: (kb: KnowledgeBase) => void;
  onDelete: (id: string) => void;
  onToggleDropdown: (id: string) => void;
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  knowledge,
  isActive,
  onCardClick,
  onEdit,
  onDelete,
  onToggleDropdown,
}) => {
  return (
    <div 
      className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onCardClick(knowledge)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Icon icon={knowledge.icon} className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <div className="font-medium">{knowledge.name}</div>
            <div className="text-sm text-gray-500">
              {knowledge.count} 文档 · {knowledge.linkedIdeas} 关联创作
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(knowledge.id);
            }}
          >
            <Icon icon="ri:more-fill" className="w-5 h-5 text-gray-400" />
          </button>
          
          {isActive && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(knowledge);
                  }}
                >
                  编辑
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(knowledge.id);
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCard; 