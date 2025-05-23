import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

// 文件上传模态框组件
interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (type: 'text' | 'image' | 'online' | 'notion' | 'custom') => void;
}

function UploadModal({ isOpen, onClose, onNext }: UploadModalProps) {
  const [selectedType, setSelectedType] = useState<'text' | 'image' | 'online' | 'notion' | 'custom'>('text');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] max-w-screen-md shadow-xl">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-medium">新增单元</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon icon="ri:close-line" className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* 文件类型选项卡 */}
          <div className="flex border-b mb-6">
            <button 
              className={`px-5 py-3 flex items-center ${selectedType === 'text' || selectedType === 'image' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600'}`}
              onClick={() => setSelectedType('text')}
            >
              <Icon icon="ri:file-text-line" className="w-5 h-5 mr-2" />
              文本格式
            </button>
          </div>

          {/* 选项区域 */}
          <div className="space-y-4">
            {/* 本地文档 */}
            <div 
              className={`p-6 border rounded-lg flex items-center cursor-pointer hover:border-indigo-300 ${selectedType === 'text' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
              onClick={() => setSelectedType('text')}
            >
              <div className="w-6 h-6 mr-3 relative">
                <div className={`w-6 h-6 rounded-full ${selectedType === 'text' ? 'bg-indigo-600' : 'border border-gray-300'} flex items-center justify-center`}>
                  {selectedType === 'text' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
              </div>
              <div className="flex-grow">
                <div className="font-medium">本地文档</div>
                <div className="text-sm text-gray-500 mt-1">上传 PDF, TXT, DOCX 格式的本地文件</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 bg-gray-50 rounded-b-lg">
          <button 
            className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-200 rounded-md"
            onClick={onClose}
          >
            取消
          </button>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={() => onNext(selectedType)}
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  );
}

// 知识库页面
function KnowledgeDetailPage() {
  const { knowledgeId } = useParams<{ knowledgeId: string }>();
  const navigate = useNavigate();
  
  // 模拟获取知识库详情
  const knowledgeDetails = {
    '1': { id: '1', name: '测试', icon: 'ri:book-3-line', count: 0, linkedIdeas: 0 },
    '2': { id: '2', name: '对话记录', icon: 'ri:chat-3-line', count: 0, linkedIdeas: 0 },
    '3': { id: '3', name: '角色剧本', icon: 'ri:file-list-line', count: 6, linkedIdeas: 0 },
    '4': { id: '4', name: '大纲', icon: 'ri:archive-line', count: 1, linkedIdeas: 0 }
  };
  
  const knowledge = knowledgeId ? knowledgeDetails[knowledgeId as keyof typeof knowledgeDetails] : null;
  
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const handleNextStep = (type: 'text' | 'image' | 'online' | 'notion' | 'custom') => {
    // 处理下一步逻辑
    console.log('选择了类型:', type);
    setShowUploadModal(false);
    // 这里可以根据类型进行不同的处理
    alert(`选择了${type}类型，将进入下一步`);
  };
  
  if (!knowledge) {
    return (
      <div className="p-10 text-center">
        <div className="text-xl text-gray-600">知识库不存在</div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => navigate('/knowledge/new')}
        >
          返回
        </button>
      </div>
    );
  }
  
  return (
    <div className="h-full bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white p-4 flex items-center border-b">
        <button 
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <Icon icon="ri:arrow-left-s-line" className="w-5 h-5 mr-1" />
          <span>知识库</span>
        </button>
        <Icon icon="ri:arrow-right-s-line" className="w-5 h-5 mx-2 text-gray-400" />
        <div className="flex items-center">
          <div className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center mr-1">
            <Icon icon={knowledge.icon} className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="font-medium">{knowledge.name}</span>
        </div>
        <div className="flex-grow"></div>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <Icon icon="ri:settings-4-line" className="w-5 h-5" />
        </button>
      </div>
      
      {/* 主内容区域 */}
      <div className="p-6">
        {/* 头部控制区域 */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <span className="text-xl font-medium mr-2">{knowledge.name}</span>
            <span className="text-gray-500">{knowledge.count} 文档</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入文件名"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Icon 
                icon="ri:search-line" 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              {searchText && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchText('')}
                >
                  <Icon icon="ri:close-line" className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              <Icon icon="ri:refresh-line" className="w-5 h-5" />
              <span>召回评测</span>
            </button>
            
            <button 
              className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={() => setShowUploadModal(true)}
            >
              <Icon icon="ri:add-line" className="w-5 h-5" />
              <span>添加</span>
            </button>
          </div>
        </div>
        
        {/* 表格区域 */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
          {/* 表头 */}
          <div className="flex items-center border-b border-gray-200 font-medium text-gray-600">
            <div className="p-4 w-12">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="p-4 flex-1">文件名</div>
            <div className="p-4 w-32 flex items-center">
              文件类型
              <Icon icon="ri:filter-line" className="w-4 h-4 ml-1 text-gray-400" />
            </div>
            <div className="p-4 w-32">数据标签</div>
            <div className="p-4 w-28">数据大小</div>
            <div className="p-4 w-28 flex items-center">
              召回次数
              <Icon icon="ri:arrow-down-s-line" className="w-4 h-4 ml-1 text-gray-400" />
            </div>
            <div className="p-4 w-40 flex items-center">
              上传时间
              <Icon icon="ri:arrow-down-s-line" className="w-4 h-4 ml-1 text-gray-400" />
            </div>
            <div className="p-4 w-40 flex items-center">
              更新时间
              <Icon icon="ri:arrow-down-s-line" className="w-4 h-4 ml-1 text-gray-400" />
            </div>
            <div className="p-4 w-24 text-center">
              操作
              <Icon icon="ri:filter-line" className="w-4 h-4 ml-1 text-gray-400" />
            </div>
          </div>
          
          {/* 没有数据时显示 */}
          <div className="py-16 text-center text-gray-500">
            没有数据
          </div>
        </div>
        
        {/* 分页控制 */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <div>共 0 条数据</div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-400">
              <Icon icon="ri:arrow-left-s-line" className="w-4 h-4" />
            </button>
            
            <button className="w-8 h-8 border border-gray-300 rounded bg-indigo-600 text-white flex items-center justify-center">
              1
            </button>
            
            <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-400">
              <Icon icon="ri:arrow-right-s-line" className="w-4 h-4" />
            </button>
            
            <span className="ml-4">每页显示：</span>
            <div className="relative">
              <select className="appearance-none border border-gray-300 rounded px-2 py-1 pr-8 bg-white focus:outline-none">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <Icon 
                icon="ri:arrow-down-s-line" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 文件上传模态框 */}
      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onNext={handleNextStep}
      />
    </div>
  );
}

export default KnowledgeDetailPage; 