from datetime import datetime
from typing import Optional, List, Dict
from pydantic import BaseModel
from enum import Enum

from ..database import RedisManager, KB_PREFIX

class ContentType(str, Enum):
    SHORT_DRAMA = "short_drama"
    SCRIPT = "script"
    NOVEL = "novel"

class KnowledgeBase(BaseModel):
    id: Optional[str] = None
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    content_type: ContentType
    llm_config: Dict = {}
    vector_config: Dict = {}
    retrieval_config: Dict = {}
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        use_enum_values = True

    @classmethod
    def create(cls, data: dict) -> 'KnowledgeBase':
        """创建新的知识库"""
        kb_id = RedisManager.generate_id(KB_PREFIX)
        now = datetime.now()
        kb_data = {
            **data,
            "id": kb_id,
            "created_at": now.isoformat(),
            "updated_at": now.isoformat()
        }
        RedisManager.save(kb_id, kb_data)
        return cls(**kb_data)

    @classmethod
    def get(cls, kb_id: str) -> Optional['KnowledgeBase']:
        """获取知识库"""
        data = RedisManager.get(kb_id)
        return cls(**data) if data else None

    @classmethod
    def list_all(cls) -> List['KnowledgeBase']:
        """列出所有知识库"""
        data = RedisManager.list_by_prefix(KB_PREFIX)
        return [cls(**item) for item in data]

    def update(self, data: dict) -> 'KnowledgeBase':
        """更新知识库"""
        current_data = RedisManager.get(self.id)
        if not current_data:
            raise ValueError("Knowledge base not found")
        
        updated_data = {
            **current_data,
            **data,
            "updated_at": datetime.now().isoformat()
        }
        RedisManager.save(self.id, updated_data)
        return self.__class__(**updated_data)

    def delete(self) -> bool:
        """删除知识库"""
        if not RedisManager.exists(self.id):
            return False
        RedisManager.delete(self.id)
        return True

    def to_dict(self) -> dict:
        """转换为字典"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "icon": self.icon,
            "content_type": self.content_type,
            "llm_config": self.llm_config,
            "vector_config": self.vector_config,
            "retrieval_config": self.retrieval_config,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        } 