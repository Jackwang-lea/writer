import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface PageLayoutProps {
  children: ReactNode;
  backTo: string;
  backText: string;
  showPrevButton?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  nextButtonText?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  backTo,
  backText,
  showPrevButton = false,
  onPrev,
  onNext,
  nextButtonText = '下一步'
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 面包屑导航 */}
      <div className="bg-white p-4 flex items-center border-b">
        <Link 
          to={backTo}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <Icon icon="ri:arrow-left-s-line" className="w-5 h-5 mr-1" />
          <span>{backText}</span>
        </Link>
      </div>
      
      {/* 主内容区域 */}
      <div className="max-w-[800px] mx-auto px-6 pb-10 pt-8">
        {children}
      </div>
      
      {/* 底部按钮 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-end">
        {showPrevButton && (
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 mr-2 hover:bg-gray-50"
            onClick={onPrev}
          >
            上一步
          </button>
        )}
        <button 
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          onClick={onNext}
        >
          {nextButtonText}
        </button>
      </div>
    </div>
  );
};

export default PageLayout; 