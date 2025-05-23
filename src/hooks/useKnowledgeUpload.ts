import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FilePreviewInfo {
  name: string;
  size: string;
  icon: string;
}

interface UseKnowledgeUploadProps {
  knowledgeId: string;
}

interface UseKnowledgeUploadReturn {
  currentStep: number;
  steps: { number: number; label: string; }[];
  uploadedFile: File | null;
  previewInfo: FilePreviewInfo | null;
  selectedTags: string[];
  handleFileSelect: (file: File) => void;
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
  handleNext: () => void;
  handlePrev: () => void;
}

export function useKnowledgeUpload({ knowledgeId }: UseKnowledgeUploadProps): UseKnowledgeUploadReturn {
  const navigate = useNavigate();
  
  // 状态管理
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewInfo, setPreviewInfo] = useState<FilePreviewInfo | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 步骤配置
  const steps = [
    { number: 1, label: '上传' },
    { number: 2, label: '分段&清洗' },
    { number: 3, label: '数据处理' }
  ];

  // 根据文件名获取图标
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'docx' || extension === 'doc') return 'word.png';
    if (extension === 'pdf') return 'pdf.png';
    if (extension === 'txt') return 'text.png';
    return 'document.png';
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

  return {
    currentStep,
    steps,
    uploadedFile,
    previewInfo,
    selectedTags,
    handleFileSelect,
    handleAddTag,
    handleRemoveTag,
    handleNext,
    handlePrev,
  };
} 