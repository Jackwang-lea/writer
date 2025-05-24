from fastapi import APIRouter, HTTPException, UploadFile, File
from typing import List
from ..database import RedisManager, DOC_PREFIX
from ..models.document import Document

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    kb_id: str = None
):
    """上传新文档"""
    try:
        content = await file.read()
        doc_data = {
            "filename": file.filename,
            "content": content.decode(),
            "knowledge_base_id": kb_id,
            "status": "pending"
        }
        doc = Document.create(doc_data)
        return doc
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[Document])
async def list_documents(kb_id: str = None):
    """获取文档列表，可选按知识库ID过滤"""
    try:
        docs = Document.list_all()
        if kb_id:
            docs = [doc for doc in docs if doc.knowledge_base_id == kb_id]
        return docs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{doc_id}", response_model=Document)
async def get_document(doc_id: str):
    """获取指定文档详情"""
    doc = Document.get(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.put("/{doc_id}", response_model=Document)
async def update_document(doc_id: str, doc_update: Document):
    """更新文档信息"""
    doc = Document.get(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    try:
        return doc.update(doc_update.dict(exclude={"id"}, exclude_unset=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{doc_id}")
async def delete_document(doc_id: str):
    """删除文档"""
    doc = Document.get(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    if doc.delete():
        return {"message": "Document deleted successfully"}
    raise HTTPException(status_code=500, detail="Failed to delete document") 