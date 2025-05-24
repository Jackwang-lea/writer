# Writer Knowledge Base Backend

基于 Python FastAPI 和 Redis 的知识库后端系统。

## 系统要求

- Python 3.8+
- Redis 6.0+
- pip (Python包管理器)

## 项目结构

```
backend/
├── app/
│   ├── models/          # 数据模型
│   ├── controllers/     # API路由控制器
│   ├── services/        # 业务逻辑服务
│   ├── schemas/         # Pydantic模型
│   └── database.py      # Redis配置
├── tests/              # 测试文件
├── requirements.txt    # 依赖包
└── .env               # 环境配置
```

## 数据模型

### KnowledgeBase (知识库)
- 键前缀: writer:kb:
- 基本信息：名称、描述、图标
- 内容类型：短剧剧本、剧本、小说
- 配置信息：LLM、向量化、检索参数

### Document (文档)
- 键前缀: writer:doc:
- 文件信息：文件名、内容、路径
- 处理状态：待处理、处理中、已完成、失败
- 关联知识点ID列表

### KnowledgePoint (知识点)
- 键前缀: writer:kp:
- 内容：文本内容
- 向量数据：embedding向量、使用的模型
- 元数据：标签、类别、相关度分数

## 安装步骤

1. 创建虚拟环境：
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
```

2. 安装依赖：
```bash
pip install -r requirements.txt
```

3. 配置环境变量：
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置信息
```

4. 配置 Redis：
```bash
# Redis配置示例
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=your_password  # 如果有密码
```

## 运行服务

开发环境：
```bash
uvicorn app.main:app --reload --port 8000
```

生产环境：
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API文档

启动服务后访问：
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 主要API端点

### 知识库管理
- POST /api/v1/knowledge-bases - 创建新知识库
- GET /api/v1/knowledge-bases - 获取知识库列表
- GET /api/v1/knowledge-bases/{id} - 获取知识库详情
- PUT /api/v1/knowledge-bases/{id} - 更新知识库
- DELETE /api/v1/knowledge-bases/{id} - 删除知识库

### 文档管理
- POST /api/v1/documents - 上传新文档
- GET /api/v1/documents - 获取文档列表
- GET /api/v1/documents/{id} - 获取文档详情
- DELETE /api/v1/documents/{id} - 删除文档

### 知识点管理
- GET /api/v1/knowledge-points - 获取知识点列表
- GET /api/v1/knowledge-points/{id} - 获取知识点详情
- POST /api/v1/knowledge-points/search - 搜索知识点

## Redis数据结构

1. 知识库数据
```
writer:kb:{id} = {
    "id": "kb:1",
    "name": "示例知识库",
    "description": "描述",
    "content_type": "short_drama",
    ...
}
```

2. 文档数据
```
writer:doc:{id} = {
    "id": "doc:1",
    "filename": "example.txt",
    "content": "文档内容",
    "knowledge_base_id": "kb:1",
    ...
}
```

3. 知识点数据
```
writer:kp:{id} = {
    "id": "kp:1",
    "content": "知识点内容",
    "embedding": [...],
    "document_id": "doc:1",
    ...
}
```

## 开发指南

1. 添加新的模型：
   - 在 `app/models/` 创建新的模型文件
   - 定义新的键前缀和数据结构

2. 添加新的API端点：
   - 在 `app/controllers/` 创建新的路由文件
   - 在 `app/main.py` 中注册路由

3. 添加新的服务：
   - 在 `app/services/` 创建新的服务文件
   - 在控制器中使用服务

## 测试

运行测试：
```bash
pytest
```

## 部署

1. 准备服务器环境
2. 安装和配置 Redis
3. 设置环境变量
4. 使用 gunicorn 运行服务：
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app
``` 