from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from redis import Redis
import json

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/writer_knowledge"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Redis配置
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)

# Redis连接
redis_client = Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
    password=REDIS_PASSWORD,
    decode_responses=True  # 自动解码响应
)

# 键前缀
KEY_PREFIX = "writer:"
KB_PREFIX = f"{KEY_PREFIX}kb:"  # 知识库
DOC_PREFIX = f"{KEY_PREFIX}doc:"  # 文档
KP_PREFIX = f"{KEY_PREFIX}kp:"  # 知识点
VECTOR_PREFIX = f"{KEY_PREFIX}vector:"  # 向量数据

class RedisManager:
    @staticmethod
    def generate_id(prefix: str) -> str:
        """生成递增的ID"""
        return f"{prefix}{redis_client.incr(f'{prefix}counter')}"
    
    @staticmethod
    def save(key: str, data: dict) -> None:
        """保存数据到Redis"""
        redis_client.set(key, json.dumps(data))
    
    @staticmethod
    def get(key: str) -> dict:
        """从Redis获取数据"""
        data = redis_client.get(key)
        return json.loads(data) if data else None
    
    @staticmethod
    def delete(key: str) -> None:
        """删除数据"""
        redis_client.delete(key)
    
    @staticmethod
    def list_by_prefix(prefix: str) -> list:
        """列出指定前缀的所有数据"""
        keys = redis_client.keys(f"{prefix}*")
        if not keys:
            return []
        data = redis_client.mget(keys)
        return [json.loads(item) for item in data if item]
    
    @staticmethod
    def exists(key: str) -> bool:
        """检查键是否存在"""
        return redis_client.exists(key)

# 测试Redis连接
def test_redis_connection():
    try:
        redis_client.ping()
        print("Successfully connected to Redis")
        return True
    except Exception as e:
        print(f"Failed to connect to Redis: {e}")
        return False 