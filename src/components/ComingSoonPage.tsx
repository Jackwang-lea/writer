import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useKnowledgeBase } from '../hooks/useKnowledgeBase';
import KnowledgeCard from './KnowledgeCard';
import CreateKnowledgeModal from './CreateKnowledgeModal';

function ComingSoonPage() {
  const [showModal, setShowModal] = useState(false);
  
  const {
    knowledgeBases,
    editingKnowledge,
    activeDropdown,
    handleCreateKnowledge,
    handleEditKnowledge,
    handleDeleteKnowledge,
    handleKnowledgeClick,
    toggleDropdown,
    handleOutsideClick,
    setEditingKnowledge
  } = useKnowledgeBase();

  return (
    <div className="p-6" onClick={handleOutsideClick}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">知识库</h1>
        <button
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          onClick={() => {
            setEditingKnowledge(null);
            setShowModal(true);
          }}
        >
          <Icon icon="ri:add-line" className="w-5 h-5 mr-1" />
          <span>新建知识库</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {knowledgeBases.map(kb => (
          <KnowledgeCard
            key={kb.id}
            knowledge={kb}
            isActive={activeDropdown === kb.id}
            onCardClick={handleKnowledgeClick}
            onEdit={handleEditKnowledge}
            onDelete={handleDeleteKnowledge}
            onToggleDropdown={toggleDropdown}
          />
        ))}
      </div>

      <CreateKnowledgeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleCreateKnowledge}
        editingKnowledge={editingKnowledge}
      />
    </div>
  );
}

export default ComingSoonPage; 