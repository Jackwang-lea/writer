import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StepIndicator from './StepIndicator';
import FileUpload from './FileUpload';
import TagSelector from './TagSelector';

function KnowledgeUploadPage() {
  const navigate = useNavigate();
  const { knowledgeId } = useParams<{ knowledgeId: string }>();
  
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
  // 选择的标签列表
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 步骤配置
  const steps = [
    { number: 1, label: '上传' },
    { number: 2, label: '分段&清洗' },
    { number: 3, label: '数据处理' }
  ];
  
  // 处理文件选择
  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setPreviewInfo({
      name: file.name,
      size: `${Math.round(file.size / 1024)}K`,
      icon: getFileIcon(file.name)
    });
  };
  
  // 根据文件名获取图标
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'docx' || extension === 'doc') return 'word.png';
    if (extension === 'pdf') return 'pdf.png';
    if (extension === 'txt') return 'text.png';
    return 'document.png';
  };

  // 处理添加标签
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 处理移除标签
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };
  
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
  
  // 渲染步骤指示器
  const renderStepIndicator = () => {
    return <StepIndicator steps={steps} currentStep={currentStep} />;
  };
  
  // 渲染上传步骤
  const renderUploadStep = () => {
    return (
      <>
        <FileUpload 
          previewInfo={previewInfo}
          onFileSelect={handleFileSelect}
        />
        <TagSelector
          selectedTags={selectedTags}
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />
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