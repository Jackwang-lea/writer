import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface KnowledgeItem {
  id: string;
  name: string;
}

interface UseSidebarKnowledgeProps {
  onKnowledgeItemClick?: () => void;
}

export function useSidebarKnowledge({ onKnowledgeItemClick }: UseSidebarKnowledgeProps) {
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

  const handleKnowledgeClick = (id: string) => {
    navigate(`/knowledge/${id}`);
  };

  return {
    isExpanded,
    knowledgeItems,
    toggleExpand,
    handleAddKnowledge,
    handleKnowledgeClick
  };
} 