import React, { useRef } from 'react';
import { Icon } from '@iconify/react';

interface FilePreviewInfo {
  name: string;
  size: string;
  icon: string;
}

interface FileUploadProps {
  previewInfo: FilePreviewInfo | null;
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ previewInfo, onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
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
  );
};

export default FileUpload; 