import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

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
            
            <button className="flex items-center gap-1 px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
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
    </div>
  );
}

export default KnowledgeDetailPage; 