import { useParams } from 'react-router-dom';
import StepIndicator from './StepIndicator';
import FileUpload from './FileUpload';
import TagSelector from './TagSelector';
import SegmentStep from './SegmentStep';
import PageLayout from './PageLayout';
import { useKnowledgeUpload } from '../hooks/useKnowledgeUpload';

function KnowledgeUploadPage() {
  const { knowledgeId } = useParams<{ knowledgeId: string }>();
  
  const {
    currentStep,
    steps,
    previewInfo,
    selectedTags,
    handleFileSelect,
    handleAddTag,
    handleRemoveTag,
    handleNext,
    handlePrev,
  } = useKnowledgeUpload({ knowledgeId: knowledgeId || '' });

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