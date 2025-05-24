from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session

from ..database import get_db, RedisManager, KB_PREFIX
from ..models.knowledge_base import KnowledgeBase

router = APIRouter()

@router.post("/", response_model=KnowledgeBase)
async def create_knowledge_base(kb: KnowledgeBase):
    """创建新的知识库"""
    try:
        return KnowledgeBase.create(kb.dict(exclude={"id"}))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[KnowledgeBase])
async def list_knowledge_bases():
    """获取所有知识库列表"""
    try:
        return KnowledgeBase.list_all()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{kb_id}", response_model=KnowledgeBase)
async def get_knowledge_base(kb_id: str):
    """获取指定知识库详情"""
    kb = KnowledgeBase.get(kb_id)
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge base not found")
    return kb

@router.put("/{kb_id}", response_model=KnowledgeBase)
async def update_knowledge_base(kb_id: str, kb_update: KnowledgeBase):
    """更新知识库信息"""
    kb = KnowledgeBase.get(kb_id)
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge base not found")
    try:
        return kb.update(kb_update.dict(exclude={"id"}, exclude_unset=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{kb_id}")
async def delete_knowledge_base(kb_id: str):
    """删除知识库"""
    kb = KnowledgeBase.get(kb_id)
    if not kb:
        raise HTTPException(status_code=404, detail="Knowledge base not found")
    if kb.delete():
        return {"message": "Knowledge base deleted successfully"}
    raise HTTPException(status_code=500, detail="Failed to delete knowledge base") 