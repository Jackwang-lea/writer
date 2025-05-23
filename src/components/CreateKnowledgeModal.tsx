import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { KnowledgeBase } from '../hooks/useKnowledgeBase';

interface CreateKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, icon: string) => void;
  editingKnowledge: KnowledgeBase | null;
}

const CreateKnowledgeModal: React.FC<CreateKnowledgeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingKnowledge 
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('ri:book-3-line');
  
  // 可选的图标列表
  const icons = [
    'ri:book-3-line',
    'ri:file-list-line',
    'ri:archive-line',
    'ri:folder-line',
    'ri:chat-3-line',
    'ri:sticky-note-line',
    'ri:mental-health-line'
  ];

  // 当编辑模式改变时，更新表单数据
  useEffect(() => {
    if (editingKnowledge) {
      setName(editingKnowledge.name);
      setDescription(editingKnowledge.description || '');
      setSelectedIcon(editingKnowledge.icon);
    } else {
      setName('');
      setDescription('');
      setSelectedIcon('ri:book-3-line');
    }
  }, [editingKnowledge]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, description, selectedIcon);
      setName('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;
  
  const titleText = editingKnowledge ? '编辑知识库' : '创建知识库';
  const buttonText = editingKnowledge ? '保存' : '创建';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">{titleText}</h2>
          <Icon 
            icon="ri:close-line" 
            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>
        
        <div className="p-6">
          {/* 图标选择 */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">选择图标</div>
            <div className="flex gap-4">
              {icons.map(icon => (
                <div 
                  key={icon}
                  className={`w-10 h-10 rounded-md flex items-center justify-center cursor-pointer ${selectedIcon === icon ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedIcon(icon)}
                >
                  <Icon icon={icon} className="w-6 h-6" />
                </div>
              ))}
            </div>
          </div>
          
          {/* 名称输入 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名称 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入知识库名称"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          {/* 描述输入 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              描述
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="添加知识库描述..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          {/* 按钮 */}
          <div className="flex justify-end p-6">
            <button
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md mr-2 hover:bg-gray-200"
              onClick={onClose}
            >
              取消
            </button>
            <button
              className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${!name.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSave}
              disabled={!name.trim()}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateKnowledgeModal; 