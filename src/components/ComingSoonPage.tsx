import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useKnowledgeBase, KnowledgeBase } from '../hooks/useKnowledgeBase';

// 创建知识库弹窗组件
interface CreateKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, icon: string) => void;
  editingKnowledge: KnowledgeBase | null;
}

function CreateKnowledgeModal({ isOpen, onClose, onSave, editingKnowledge }: CreateKnowledgeModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('ri:book-3-line');
  
  // 当编辑模式改变时，更新表单数据
  useState(() => {
    if (editingKnowledge) {
      setName(editingKnowledge.name);
      setDescription(editingKnowledge.description || '');
      setSelectedIcon(editingKnowledge.icon);
    } else {
      setName('');
      setDescription('');
      setSelectedIcon('ri:book-3-line');
    }
  });
  
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

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, description, selectedIcon);
      setName('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;
  
  // 设置正确的标题文本
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
}

function ComingSoonPage() {
  const [showModal, setShowModal] = useState(false);
  
  const {
    knowledgeBases,
    editingKnowledge,
    activeDropdown,
    handleCreateKnowledge,
    handleEditKnowledge,
    handleDeleteKnowledge,
    handleKnowledgeClick,
    toggleDropdown,
    handleOutsideClick,
    setEditingKnowledge
  } = useKnowledgeBase();

  // 渲染知识库卡片
  const renderKnowledgeCard = (kb: KnowledgeBase) => {
    return (
      <div 
        key={kb.id}
        className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleKnowledgeClick(kb)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Icon icon={kb.icon} className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-3">
              <div className="font-medium">{kb.name}</div>
              <div className="text-sm text-gray-500">{kb.count} 文档 · {kb.linkedIdeas} 关联创作</div>
            </div>
          </div>
          
          <div className="relative">
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown(kb.id);
              }}
            >
              <Icon icon="ri:more-fill" className="w-5 h-5 text-gray-400" />
            </button>
            
            {activeDropdown === kb.id && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditKnowledge(kb);
                    }}
                  >
                    编辑
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteKnowledge(kb.id);
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

  return (
    <div className="p-6" onClick={handleOutsideClick}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">知识库</h1>
        <button
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={() => {
            setEditingKnowledge(null);
            setShowModal(true);
          }}
        >
          <Icon icon="ri:add-line" className="w-5 h-5 mr-1" />
          <span>新建知识库</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeBases.map(renderKnowledgeCard)}
      </div>

      {/* 创建/编辑知识库模态框 */}
      {showModal && (
        <CreateKnowledgeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleCreateKnowledge}
          editingKnowledge={editingKnowledge}
        />
      )}
    </div>
  );
}

export default ComingSoonPage; 