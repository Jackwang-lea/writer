import { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SidebarSection from './SidebarSection'
import SidebarKnowledgeSection from './SidebarKnowledgeSection'
import { useSidebarWorks } from '../hooks/useSidebarWorks'

const Sidebar = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    works: true,
    knowledge: false,
    workflow: false
  });

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 通用toast提示函数
  const showToast = () => {
    toast('新功能加班加点更新中～');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto flex flex-col">
      <div className="p-4 flex-grow">
        {/* 作品集部分 */}
        <SidebarSection
          title="作品集"
          isExpanded={expandedSections.works}
          onToggle={() => toggleSection('works')}
          onAdd={handleAddWork}
        >
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
        </SidebarSection>

        {/* 知识库部分 */}
        <SidebarKnowledgeSection />

        {/* 工作流部分 */}
        <SidebarSection
          title="工作流"
          isExpanded={expandedSections.workflow}
          onToggle={() => toggleSection('workflow')}
          onAdd={showToast}
        />
      </div>
      
      {/* 底部固定文本 */}
      <div className="p-4 text-center text-gray-400 text-sm border-t border-gray-100">
        Writer.AI @千帆叙梦
      </div>
    </div>
  );
};

export default Sidebar 