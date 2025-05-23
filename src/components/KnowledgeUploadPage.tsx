import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import StepIndicator from './StepIndicator';
import FileUpload from './FileUpload';
import TagSelector from './TagSelector';
import SegmentStep from './SegmentStep';
import PageLayout from './PageLayout';

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
    const handlePreviewClick = () => {
      // 处理预览点击事件
      console.log('预览分段');
    };

    return (
      <SegmentStep
        documentCount={1}
        onPreviewClick={handlePreviewClick}
      />
    );
  };
  
  // 渲染当前步骤内容
  const renderCurrentStepContent = () => {
    return (
      <>
        <StepIndicator steps={steps} currentStep={currentStep} />
        {currentStep === 1 && renderUploadStep()}
        {currentStep === 2 && renderSegmentStep()}
      </>
    );
  };

  return (
    <PageLayout
      backTo="/knowledge/new"
      backText="添加"
      showPrevButton={currentStep > 1}
      onPrev={handlePrev}
      onNext={handleNext}
    >
      {renderCurrentStepContent()}
    </PageLayout>
  );
}

export default KnowledgeUploadPage; 