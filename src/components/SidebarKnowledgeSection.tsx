import SidebarSectionHeader from './SidebarSectionHeader';
import KnowledgeListItem from './KnowledgeListItem';
import { useSidebarKnowledge } from '../hooks/useSidebarKnowledge';

interface SidebarKnowledgeSectionProps {
  onKnowledgeItemClick?: () => void;
}

function SidebarKnowledgeSection({ onKnowledgeItemClick }: SidebarKnowledgeSectionProps) {
  const {
    isExpanded,
    knowledgeItems,
    toggleExpand,
    handleAddKnowledge,
    handleKnowledgeClick
  } = useSidebarKnowledge({ onKnowledgeItemClick });

  return (
    <div>
      <SidebarSectionHeader
        title="知识库"
        isExpanded={isExpanded}
        onToggleExpand={() => toggleExpand()}
        onAdd={handleAddKnowledge}
      />

      {/* 展开时显示子项目 */}
      {isExpanded && (
        <div className="ml-7 space-y-2 mt-2">
          {knowledgeItems.map(item => (
            <KnowledgeListItem
              key={item.id}
              id={item.id}
              name={item.name}
              onClick={handleKnowledgeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SidebarKnowledgeSection; 