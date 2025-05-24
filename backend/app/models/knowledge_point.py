from datetime import datetime
from typing import Optional, Dict, List
from pydantic import BaseModel

from ..database import RedisManager, KP_PREFIX

class KnowledgePoint(BaseModel):
    id: Optional[str] = None
    content: str
    document_id: str
    knowledge_base_id: str
    embedding: Optional[List[float]] = None
    embedding_model: Optional[str] = None
    metadata: Dict = {}
    tags: List[str] = []
    relevance_score: Optional[float] = None
    created_at: datetime = None
    updated_at: datetime = None

    @classmethod
    def create(cls, data: dict) -> 'KnowledgePoint':
        """创建新的知识点"""
        kp_id = RedisManager.generate_id(KP_PREFIX)
        now = datetime.now()
        kp_data = {
            **data,
            "id": kp_id,
            "created_at": now.isoformat(),
            "updated_at": now.isoformat()
        }
        RedisManager.save(kp_id, kp_data)
        return cls(**kp_data)

    @classmethod
    def get(cls, kp_id: str) -> Optional['KnowledgePoint']:
        """获取知识点"""
        data = RedisManager.get(kp_id)
        return cls(**data) if data else None

    @classmethod
    def list_all(cls) -> list['KnowledgePoint']:
        """列出所有知识点"""
        data = RedisManager.list_by_prefix(KP_PREFIX)
        return [cls(**item) for item in data]

    def update(self, data: dict) -> 'KnowledgePoint':
        """更新知识点"""
        current_data = RedisManager.get(self.id)
        if not current_data:
            raise ValueError("Knowledge point not found")
        
        updated_data = {
            **current_data,
            **data,
            "updated_at": datetime.now().isoformat()
        }
        RedisManager.save(self.id, updated_data)
        return self.__class__(**updated_data)

    def delete(self) -> bool:
        """删除知识点"""
        if not RedisManager.exists(self.id):
            return False
        RedisManager.delete(self.id)
        return True

    def to_dict(self) -> dict:
        """转换为字典"""
        return {
            "id": self.id,
            "content": self.content,
            "document_id": self.document_id,
            "knowledge_base_id": self.knowledge_base_id,
            "embedding": self.embedding,
            "embedding_model": self.embedding_model,
            "metadata": self.metadata,
            "tags": self.tags,
            "relevance_score": self.relevance_score,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        } 