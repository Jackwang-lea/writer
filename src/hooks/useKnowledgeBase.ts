import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface KnowledgeBase {
  id: string;
  name: string;
  icon: string;
  count: number;
  linkedIdeas: number;
  description?: string;
}

interface UseKnowledgeBaseReturn {
  knowledgeBases: KnowledgeBase[];
  editingKnowledge: KnowledgeBase | null;
  activeDropdown: string | null;
  handleCreateKnowledge: (name: string, description: string, icon: string) => void;
  handleEditKnowledge: (knowledge: KnowledgeBase) => void;
  handleDeleteKnowledge: (id: string) => void;
  handleKnowledgeClick: (kb: KnowledgeBase) => void;
  toggleDropdown: (id: string) => void;
  handleOutsideClick: () => void;
  setEditingKnowledge: (knowledge: KnowledgeBase | null) => void;
}

export function useKnowledgeBase(): UseKnowledgeBaseReturn {
  const navigate = useNavigate();
  
  // 状态管理
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([
    { id: '1', name: '测试', icon: 'ri:book-3-line', count: 0, linkedIdeas: 0 },
    { id: '2', name: '对话记录', icon: 'ri:chat-3-line', count: 0, linkedIdeas: 0 },
    { id: '3', name: '角色剧本', icon: 'ri:file-list-line', count: 6, linkedIdeas: 0 },
    { id: '4', name: '大纲', icon: 'ri:archive-line', count: 1, linkedIdeas: 0 }
  ]);
  
  const [editingKnowledge, setEditingKnowledge] = useState<KnowledgeBase | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleCreateKnowledge = (name: string, description: string, icon: string) => {
    if (editingKnowledge) {
      // 更新现有知识库
      setKnowledgeBases(prev => 
        prev.map(kb => kb.id === editingKnowledge.id 
          ? { ...kb, name, description, icon }
          : kb
        )
      );
      setEditingKnowledge(null);
    } else {
      // 创建新知识库
      const newId = `kb-${Date.now()}`;
      const newKnowledgeBase = {
        id: newId,
        name: name,
        icon: icon,
        count: 0,
        linkedIdeas: 0,
        description: description
      };
      setKnowledgeBases(prev => [...prev, newKnowledgeBase]);
    }
    // 成功提示
    alert(editingKnowledge ? `更新成功: ${name}` : `创建成功: ${name}`);
  };

  const handleEditKnowledge = (knowledge: KnowledgeBase) => {
    setEditingKnowledge(knowledge);
    setActiveDropdown(null);
  };

  const handleDeleteKnowledge = (id: string) => {
    if (confirm('确定要删除此知识库吗？')) {
      setKnowledgeBases(prev => prev.filter(kb => kb.id !== id));
    }
    setActiveDropdown(null);
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleOutsideClick = () => {
    if (activeDropdown) {
      setActiveDropdown(null);
    }
  };

  const handleKnowledgeClick = (kb: KnowledgeBase) => {
    navigate(`/knowledge/${kb.id}`);
  };

  return {
    knowledgeBases,
    editingKnowledge,
    activeDropdown,
    handleCreateKnowledge,
    handleEditKnowledge,
    handleDeleteKnowledge,
    handleKnowledgeClick,
    toggleDropdown,
    handleOutsideClick,
    setEditingKnowledge,
  };
} 