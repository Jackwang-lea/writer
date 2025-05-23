import React from 'react';
import { Icon } from '@iconify/react';

interface SegmentStepProps {
  documentCount: number;
  onPreviewClick: () => void;
}

const SegmentStep: React.FC<SegmentStepProps> = ({
  documentCount,
  onPreviewClick
}) => {
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
        共 {documentCount} 文档
        <button 
          className="text-indigo-600 hover:underline ml-4"
          onClick={onPreviewClick}
        >
          分段预览
        </button>
      </div>
    </div>
  );
};

export default SegmentStep; 