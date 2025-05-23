import { useState, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function KnowledgeUploadPage() {
  const navigate = useNavigate();
  const { knowledgeId } = useParams<{ knowledgeId: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 当前步骤
  const [currentStep, setCurrentStep] = useState(1);
  // 上传的文件
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  // 预览信息
  const [previewInfo, setPreviewInfo] = useState<{
    name: string;
    size: string;
    icon: string;
  } | null>(null);
  // 是否显示标签选择
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  // 选择的标签列表
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // 新标签输入
  const [newTagInput, setNewTagInput] = useState('');
  // 是否显示新标签输入
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  // 分段方式
  const [segmentMethod, setSegmentMethod] = useState<'smart' | 'custom'>('smart');
  
  // 处理下一步
  const handleNext = () => {
    if (!uploadedFile && !previewInfo) {
      alert('请先上传文件');
      return;
    }
    
    console.log('处理下一步，选择的标签:', selectedTags);
    // 实际项目中，这里会提交数据到后端
    alert('上传成功！');
    navigate(`/knowledge/${knowledgeId}`);
  };
  
  // 处理上一步
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // 添加标签
  const handleAddTag = (tag: string) => {
    if (!tag.trim()) return;
    
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setShowTagsDropdown(false);
    setNewTagInput('');
    setShowNewTagInput(false);
  };
  
  // 移除标签
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
  // 处理文件拖放
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // 处理文件上传
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };
  
  // 处理文件选择
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setPreviewInfo({
      name: file.name,
      size: `${Math.round(file.size / 1024)}K`,
      icon: getFileIcon(file.name)
    });
  };
  
  // 打开文件选择对话框
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // 处理文件输入变化
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  // 根据文件名获取图标
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'docx' || extension === 'doc') return 'word.png';
    if (extension === 'pdf') return 'pdf.png';
    if (extension === 'txt') return 'text.png';
    return 'document.png';
  };
  
  // 渲染步骤指示器
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center w-[600px]">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              1
            </div>
            <div className={`mt-2 ${currentStep === 1 ? 'text-gray-700' : 'text-gray-400'}`}>上传</div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              2
            </div>
            <div className={`mt-2 ${currentStep === 2 ? 'text-gray-700' : 'text-gray-400'}`}>分段&清洗</div>
          </div>
          <div className="flex-1 h-[1px] bg-gray-300 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <div className={`mt-2 ${currentStep === 3 ? 'text-gray-700' : 'text-gray-400'}`}>数据处理</div>
          </div>
        </div>
      </div>
    );
  };
  
  // 渲染上传步骤
  const renderUploadStep = () => {
    return (
      <>
        {/* 文件上传区域 */}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white mb-8"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileInputChange}
            accept=".pdf,.txt,.doc,.docx"
          />
          
          <div className="py-10">
            <div className="mb-6 text-gray-600">
              将文件拖到此区域，或 
              <button 
                type="button"
                className="text-indigo-600 hover:underline ml-1"
                onClick={openFileSelector}
              >
                点击上传
              </button>
            </div>
            <div className="text-sm text-gray-400">支持TXT、DOC、DOCX 最多可上传 10 个附件</div>
          </div>
          
          {/* 文件预览 */}
          {previewInfo && (
            <div className="mt-6 border border-gray-200 rounded-lg p-3 flex items-center">
              <div className="w-10 h-10 bg-indigo-50 flex items-center justify-center mr-3 rounded">
                <Icon icon="ri:file-word-2-line" className="w-6 h-6 text-indigo-500" />
              </div>
              <div className="flex-grow text-left">
                <div className="font-medium">{previewInfo.name}</div>
                <div className="text-xs text-gray-500">{previewInfo.size}</div>
              </div>
              <div className="text-green-500">
                <Icon icon="ri:check-line" className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>
        
        {/* 标签选择 */}
        <div className="mb-8">
          <div className="text-gray-700 mb-2">数据标签 (非必填，用于给文档打标，便于后续召回过滤)</div>
          <div className="relative">
            <div 
              className="border border-gray-300 rounded-lg p-3 flex items-center flex-wrap gap-2 min-h-[48px] cursor-pointer"
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            >
              {selectedTags.length > 0 ? (
                selectedTags.map(tag => (
                  <div key={tag} className="bg-gray-100 rounded-md px-2 py-1 flex items-center text-sm">
                    <span>{tag}</span>
                    <button 
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(tag);
                      }}
                    >
                      <Icon icon="ri:close-line" className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-gray-400">请选择标签</div>
              )}
              <Icon 
                icon={showTagsDropdown ? "ri:arrow-up-s-line" : "ri:arrow-down-s-line"} 
                className="ml-auto text-gray-500 w-5 h-5" 
              />
            </div>
            
            {/* 标签下拉菜单 */}
            {showTagsDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
                {/* 添加新标签按钮 */}
                <div 
                  className="p-2 border-b flex items-center cursor-pointer hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowNewTagInput(true);
                  }}
                >
                  <Icon icon="ri:add-line" className="text-indigo-600 w-5 h-5 mr-1" />
                  <span className="text-indigo-600">增加标签</span>
                </div>
                
                {/* 新标签输入 */}
                {showNewTagInput ? (
                  <div className="p-2 border-b" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="请输入标签名称"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddTag(newTagInput);
                          }
                        }}
                      />
                      <button
                        className="ml-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
                        onClick={() => handleAddTag(newTagInput)}
                      >
                        添加
                      </button>
                      <button
                        className="ml-1 px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded hover:bg-gray-50"
                        onClick={() => {
                          setShowNewTagInput(false);
                          setNewTagInput('');
                        }}
                      >
                        取消
                      </button>
                    </div>
                  </div>
                ) : null}
                
                {/* 无标签选项提示 */}
                {!showNewTagInput && (
                  <div className="p-2 text-gray-500">无选项</div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };
  
  // 渲染分段清洗步骤
  const renderSegmentStep = () => {
    return (
      <div className="bg-white rounded-lg p-6">
        <div className="space-y-4">
          {/* 自定义选项 */}
          <div className="p-6 border border-indigo-100 bg-indigo-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <Icon icon="ri:settings-4-line" className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-medium">自定义</div>
                <div className="text-gray-600 mt-1">优先按换行符切分，超出设置的最大分段长度后，按最大分段长度和分段重叠长度处理</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          共 1 文档
          <button className="text-indigo-600 hover:underline ml-4">分段预览</button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white p-4 flex items-center border-b">
        <Link 
          to="/knowledge/new"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Icon icon="ri:arrow-left-s-line" className="w-5 h-5 mr-1" />
          <span>添加</span>
        </Link>
      </div>
      
      {/* 主内容区域 */}
      <div className="max-w-[800px] mx-auto px-6 pb-10 pt-8">
        {/* 步骤指示器 */}
        {renderStepIndicator()}
        
        {/* 步骤内容 */}
        {currentStep === 1 && renderUploadStep()}
        {currentStep === 2 && renderSegmentStep()}
      </div>
      
      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end">
        {currentStep > 1 && (
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 mr-2 hover:bg-gray-50"
            onClick={handlePrev}
          >
            上一步
          </button>
        )}
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={handleNext}
        >
          下一步
        </button>
      </div>
    </div>
  );
}

export default KnowledgeUploadPage; 