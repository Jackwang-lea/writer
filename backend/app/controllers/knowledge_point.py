from fastapi import APIRouter, HTTPException
from typing import List, Optional
from ..database import RedisManager, KP_PREFIX
from ..models.knowledge_point import KnowledgePoint

router = APIRouter()

@router.post("/", response_model=KnowledgePoint)
async def create_knowledge_point(kp: KnowledgePoint):
    """创建新的知识点"""
    try:
        return KnowledgePoint.create(kp.dict(exclude={"id"}))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[KnowledgePoint])
async def list_knowledge_points(
    doc_id: Optional[str] = None,
    kb_id: Optional[str] = None
):
    """获取知识点列表，可选按文档ID或知识库ID过滤"""
    try:
        kps = KnowledgePoint.list_all()
        if doc_id:
            kps = [kp for kp in kps if kp.document_id == doc_id]
        if kb_id:
            kps = [kp for kp in kps if kp.knowledge_base_id == kb_id]
        return kps
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{kp_id}", response_model=KnowledgePoint)
async def get_knowledge_point(kp_id: str):
    """获取指定知识点详情"""
    kp = KnowledgePoint.get(kp_id)
    if not kp:
        raise HTTPException(status_code=404, detail="Knowledge point not found")
    return kp

@router.put("/{kp_id}", response_model=KnowledgePoint)
async def update_knowledge_point(kp_id: str, kp_update: KnowledgePoint):
    """更新知识点信息"""
    kp = KnowledgePoint.get(kp_id)
    if not kp:
        raise HTTPException(status_code=404, detail="Knowledge point not found")
    try:
        return kp.update(kp_update.dict(exclude={"id"}, exclude_unset=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{kp_id}")
async def delete_knowledge_point(kp_id: str):
    """删除知识点"""
    kp = KnowledgePoint.get(kp_id)
    if not kp:
        raise HTTPException(status_code=404, detail="Knowledge point not found")
    if kp.delete():
        return {"message": "Knowledge point deleted successfully"}
    raise HTTPException(status_code=500, detail="Failed to delete knowledge point")

@router.post("/search")
async def search_knowledge_points(query: str, kb_id: Optional[str] = None):
    """搜索知识点"""
    try:
        # 这里可以实现向量搜索逻辑
        kps = KnowledgePoint.list_all()
        if kb_id:
            kps = [kp for kp in kps if kp.knowledge_base_id == kb_id]
        # 简单的文本匹配，实际应该使用向量搜索
        results = [kp for kp in kps if query.lower() in kp.content.lower()]
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 