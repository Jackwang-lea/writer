import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import SidebarKnowledgeSection from './SidebarKnowledgeSection'
import { useSidebarWorks } from '../hooks/useSidebarWorks'

const Sidebar = () => {
  const {
    expandedItems,
    works,
    editingWorkId,
    editingWorkName,
    editInputRef,
    toggleExpand,
    handleWorkClick,
    handleWorkDoubleClick,
    handleWorkEditSave,
    handleWorkEditCancel,
    handleWorkEditKeyPress,
    handleAddWork,
    handleDownloadWork,
    handleDownloadCharacterScript,
    handleDownloadScript,
    handleAddScript,
    handleWorkflowOtherAction,
    handleScriptClick,
    setEditingWorkName
  } = useSidebarWorks();

  // 通用toast提示函数
  const showToast = () => {
    toast('新功能加班加点更新中～');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      {/* 作品集部分 */}
      <div className="p-4">
        <div className="font-bold text-lg mb-2 flex justify-between items-center">
          <span>作品集</span>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleAddWork}
          >
            <Icon icon="ri:add-line" className="w-5 h-5" />
          </button>
        </div>

        {/* 作品列表 */}
        {works.map(work => (
          <div key={work.id}>
            {/* 作品标题 */}
            <div
              className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer ${
                expandedItems[work.id] ? 'bg-gray-50' : ''
              }`}
              onClick={() => handleWorkClick(work)}
              onDoubleClick={() => handleWorkDoubleClick(work)}
            >
              <div className="flex items-center flex-grow">
                <Icon
                  icon={expandedItems[work.id] ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"}
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(work.id);
                  }}
                />
                {editingWorkId === work.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    className="ml-2 flex-grow bg-white border rounded px-1"
                    value={editingWorkName}
                    onChange={(e) => setEditingWorkName(e.target.value)}
                    onBlur={handleWorkEditSave}
                    onKeyDown={handleWorkEditKeyPress}
                  />
                ) : (
                  <span className="ml-2 flex-grow">{work.name}</span>
                )}
              </div>
              <div className="flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={handleDownloadWork}
                >
                  <Icon icon="ri:download-line" className="w-4 h-4" />
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={handleWorkflowOtherAction}
                >
                  <Icon icon="ri:more-line" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 展开的视图和角色 */}
            {expandedItems[work.id] && (
              <div className="ml-6">
                {/* 视图列表 */}
                {Object.entries(work.views).map(([view, enabled]) => 
                  enabled && (
                    <div
                      key={view}
                      className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => showToast()}
                    >
                      <Icon icon="ri:file-list-line" className="w-5 h-5 text-gray-500" />
                      <span className="ml-2">{view}</span>
                    </div>
                  )
                )}

                {/* 角色剧本部分 */}
                {work.characters && (
                  <div>
                    <div
                      className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => toggleExpand(`${work.id}-characters`)}
                    >
                      <Icon
                        icon={expandedItems[`${work.id}-characters`] ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"}
                        className="w-5 h-5 text-gray-500"
                      />
                      <span className="ml-2">角色剧本</span>
                      <button
                        className="ml-auto text-gray-500 hover:text-gray-700"
                        onClick={handleDownloadCharacterScript}
                      >
                        <Icon icon="ri:download-line" className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 展开的角色列表 */}
                    {expandedItems[`${work.id}-characters`] && (
                      <div className="ml-6">
                        {work.characters.map(char => (
                          <div key={char.id}>
                            <div
                              className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                              onClick={() => toggleExpand(`${work.id}-${char.id}`)}
                            >
                              <Icon
                                icon={expandedItems[`${work.id}-${char.id}`] ? "ri:arrow-down-s-line" : "ri:arrow-right-s-line"}
                                className="w-5 h-5 text-gray-500"
                              />
                              <span className="ml-2">{char.name}</span>
                              {char.type === 'draft' && (
                                <span className="ml-2 text-xs text-gray-500">草稿</span>
                              )}
                            </div>

                            {/* 展开的剧本列表 */}
                            {expandedItems[`${work.id}-${char.id}`] && char.scripts && (
                              <div className="ml-6">
                                {char.scripts.map(script => (
                                  <div
                                    key={script.id}
                                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                                    onClick={() => handleScriptClick()}
                                  >
                                    <div className="flex items-center">
                                      <Icon icon="ri:file-text-line" className="w-5 h-5 text-gray-500" />
                                      <span className="ml-2">{script.name}</span>
                                    </div>
                                    <button
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={handleDownloadScript}
                                    >
                                      <Icon icon="ri:download-line" className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  className="flex items-center p-2 text-gray-500 hover:text-gray-700 w-full"
                                  onClick={handleAddScript}
                                >
                                  <Icon icon="ri:add-line" className="w-5 h-5" />
                                  <span className="ml-2">添加剧本</span>
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 知识库部分 */}
      <SidebarKnowledgeSection />
    </div>
  );
};

export default Sidebar 