import { useState } from 'react';
import { Icon } from '@iconify/react';

// 创建知识库弹窗组件
interface CreateKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, icon: string) => void;
}

function CreateKnowledgeModal({ isOpen, onClose, onSave }: CreateKnowledgeModalProps) {
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

  const handleSave = () => {
    if (name.trim()) {
      onSave(name, description, selectedIcon);
      setName('');
      setDescription('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">创建知识库</h2>
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
          <div className="flex justify-end">
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
              创建
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoonPage() {
  const [showModal, setShowModal] = useState(false);
  
  const handleCreateKnowledge = (name: string, description: string, icon: string) => {
    console.log('创建知识库:', { name, description, icon });
    // 这里可以添加真实的创建逻辑
    alert(`创建成功: ${name}`);
  };
  
  // 模拟已有的知识库数据
  const knowledgeBases = [
    { id: '1', name: '测试', icon: 'ri:book-3-line', count: 0, linkedIdeas: 0 },
    { id: '2', name: '对话记录', icon: 'ri:chat-3-line', count: 0, linkedIdeas: 0 },
    { id: '3', name: '角色剧本', icon: 'ri:file-list-line', count: 6, linkedIdeas: 0 },
    { id: '4', name: '大纲', icon: 'ri:archive-line', count: 1, linkedIdeas: 0 }
  ];
  
  return (
    <div className="p-10 h-full bg-gray-50">
      <div className="grid grid-cols-4 gap-6">
        {/* 创建知识库卡片 */}
        <div 
          className="bg-white rounded-lg p-6 h-60 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowModal(true)}
        >
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Icon icon="ri:add-line" className="w-6 h-6 text-gray-600" />
          </div>
          <div className="text-gray-600 text-sm">创建知识库</div>
        </div>
        
        {/* 已有知识库卡片 */}
        {knowledgeBases.map(kb => (
          <div key={kb.id} className="bg-white rounded-lg shadow-sm h-60 flex flex-col">
            <div className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <Icon icon={kb.icon} className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="font-medium">{kb.name}</div>
              </div>
              <Icon icon="ri:more-fill" className="w-5 h-5 text-gray-400 cursor-pointer" />
            </div>
            
            <div className="flex-grow"></div>
            
            <div className="p-4 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
              <div>{kb.count} 文档</div>
              <div>{kb.linkedIdeas} 关联 IDEAs</div>
            </div>
          </div>
        ))}
      </div>
      
      <CreateKnowledgeModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleCreateKnowledge}
      />
    </div>
  );
}

export default ComingSoonPage; 