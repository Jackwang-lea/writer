from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .controllers import knowledge_base, document, knowledge_point
from .database import test_redis_connection

# 测试Redis连接
test_redis_connection()

app = FastAPI(
    title="Writer Knowledge Base API",
    description="API for managing knowledge bases and documents",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置具体的源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(knowledge_base.router, prefix="/api/v1/knowledge-bases", tags=["knowledge-bases"])
app.include_router(document.router, prefix="/api/v1/documents", tags=["documents"])
app.include_router(knowledge_point.router, prefix="/api/v1/knowledge-points", tags=["knowledge-points"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to Writer Knowledge Base API",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    } 