import React, { useState } from 'react';
import { Icon } from '@iconify/react';

interface TagSelectorProps {
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onAddTag,
  onRemoveTag,
}) => {
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleAddTag = (tag: string) => {
    if (!tag.trim()) return;
    onAddTag(tag);
    setShowTagsDropdown(false);
    setNewTagInput('');
    setShowNewTagInput(false);
  };

  return (
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
                    onRemoveTag(tag);
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
  );
};

export default TagSelector; 