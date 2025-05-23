import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export interface Script {
  id: string;
  name: string;
}

export interface Character {
  id: string;
  name: string;
  type: string;
  scripts?: Script[];
}

export interface Work {
  id: string;
  name: string;
  views: {
    outline: boolean;
    characters: boolean;
    hostManual: boolean;
    materials: boolean;
  };
  characters?: Character[];
  lastVisitedView?: string;
}

export interface ExpandedItems {
  [key: string]: boolean;
}

export function useSidebarWorks() {
  // 展开状态管理
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({
    works: true,
    'work-1': true,
    'work-1-characters': true,
    'work-1-char-1': true
  });

  // 作品数据管理
  const [works, setWorks] = useState<Work[]>([
    {
      id: 'work-1',
      name: '《大纲》',
      views: {
        outline: true,
        characters: true,
        hostManual: true,
        materials: true
      },
      characters: [
        {
          id: 'char-1',
          name: '女1',
          type: 'draft',
          scripts: [
            { id: 'script-1', name: '第一本' },
            { id: 'script-2', name: '第二本' },
            { id: 'script-3', name: '第三本' }
          ]
        },
        {
          id: 'char-2',
          name: '女2',
          type: 'draft'
        }
      ]
    }
  ]);

  // 编辑状态管理
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [editingWorkName, setEditingWorkName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // 通用提示函数
  const showToast = () => {
    toast('新功能加班加点更新中～');
  };

  // 展开/折叠处理
  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // 作品点击处理
  const handleWorkClick = (work: Work) => {
    const view = work.lastVisitedView || 'outline';
    console.log(`Navigating to ${view} view for work: ${work.name}`);
  };

  // 作品编辑处理
  const handleWorkDoubleClick = (work: Work) => {
    setEditingWorkId(work.id);
    setEditingWorkName(work.name);
  };

  const handleWorkEditSave = () => {
    if (editingWorkId) {
      setWorks(prev => 
        prev.map(work => 
          work.id === editingWorkId 
            ? { ...work, name: editingWorkName }
            : work
        )
      );
      setEditingWorkId(null);
      setEditingWorkName('');
    }
  };

  const handleWorkEditCancel = () => {
    setEditingWorkId(null);
    setEditingWorkName('');
  };

  const handleWorkEditKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleWorkEditSave();
    } else if (e.key === 'Escape') {
      handleWorkEditCancel();
    }
  };

  // 其他操作处理
  const handleAddWork = () => showToast();
  const handleDownloadWork = async () => showToast();
  const handleDownloadCharacterScript = async () => showToast();
  const handleDownloadScript = async () => showToast();
  const handleAddScript = () => showToast();
  const handleWorkflowOtherAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast();
  };
  const handleScriptClick = () => showToast();

  // 编辑状态焦点管理
  useEffect(() => {
    if (editingWorkId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingWorkId]);

  return {
    // 状态
    expandedItems,
    works,
    editingWorkId,
    editingWorkName,
    editInputRef,

    // 方法
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
  };
} 