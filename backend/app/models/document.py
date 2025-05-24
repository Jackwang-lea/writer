from datetime import datetime
from typing import Optional, Dict
from pydantic import BaseModel
from enum import Enum

from ..database import RedisManager, DOC_PREFIX

class DocumentStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class Document(BaseModel):
    id: Optional[str] = None
    filename: str
    content: str
    knowledge_base_id: Optional[str] = None
    status: DocumentStatus = DocumentStatus.PENDING
    error_message: Optional[str] = None
    metadata: Dict = {}
    created_at: datetime = None
    updated_at: datetime = None

    class Config:
        use_enum_values = True

    @classmethod
    def create(cls, data: dict) -> 'Document':
        """创建新的文档"""
        doc_id = RedisManager.generate_id(DOC_PREFIX)
        now = datetime.now()
        doc_data = {
            **data,
            "id": doc_id,
            "created_at": now.isoformat(),
            "updated_at": now.isoformat()
        }
        RedisManager.save(doc_id, doc_data)
        return cls(**doc_data)

    @classmethod
    def get(cls, doc_id: str) -> Optional['Document']:
        """获取文档"""
        data = RedisManager.get(doc_id)
        return cls(**data) if data else None

    @classmethod
    def list_all(cls) -> list['Document']:
        """列出所有文档"""
        data = RedisManager.list_by_prefix(DOC_PREFIX)
        return [cls(**item) for item in data]

    def update(self, data: dict) -> 'Document':
        """更新文档"""
        current_data = RedisManager.get(self.id)
        if not current_data:
            raise ValueError("Document not found")
        
        updated_data = {
            **current_data,
            **data,
            "updated_at": datetime.now().isoformat()
        }
        RedisManager.save(self.id, updated_data)
        return self.__class__(**updated_data)

    def delete(self) -> bool:
        """删除文档"""
        if not RedisManager.exists(self.id):
            return False
        RedisManager.delete(self.id)
        return True

    def to_dict(self) -> dict:
        """转换为字典"""
        return {
            "id": self.id,
            "filename": self.filename,
            "content": self.content,
            "knowledge_base_id": self.knowledge_base_id,
            "status": self.status,
            "error_message": self.error_message,
            "metadata": self.metadata,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        } 