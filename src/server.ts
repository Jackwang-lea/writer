import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

const app = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

// 获取所有作品
app.get('/api/works', async (_req, res) => {
  try {
    const works = await prisma.work.findMany();
    res.json(works);
  } catch (error) {
    console.error('Error fetching works:', error);
    res.status(500).json({ error: 'Failed to fetch works' });
  }
});

// 获取作品的所有角色剧本
app.get('/api/works/:workId/scripts', async (req, res) => {
  const { workId } = req.params;
  
  try {
    const scripts = await prisma.characterScript.findMany();
    res.json(scripts);
  } catch (error) {
    console.error('Error fetching scripts:', error);
    res.status(500).json({ error: 'Failed to fetch scripts' });
  }
});

// 获取单个剧本
app.get('/api/scripts/:scriptId', async (req, res) => {
  const { scriptId } = req.params;
  
  try {
    const script = await prisma.characterScript.findUnique();

    if (!script) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }

    res.json(script);
  } catch (error) {
    console.error('Error fetching script:', error);
    res.status(500).json({ error: 'Failed to fetch script' });
  }
});

// 更新剧本
app.put('/api/scripts/:scriptId', async (req, res) => {
  const { scriptId } = req.params;
  const { content } = req.body;
  
  try {
    const updatedScript = await prisma.characterScript.update();
    res.json(updatedScript);
  } catch (error) {
    console.error('Error updating script:', error);
    res.status(500).json({ error: 'Failed to update script' });
  }
});

// 删除剧本
app.delete('/api/scripts/:scriptId', async (req, res) => {
  const { scriptId } = req.params;
  
  try {
    await prisma.characterScript.delete();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting script:', error);
    res.status(500).json({ error: 'Failed to delete script' });
  }
});

// 下载剧本
app.get('/api/scripts/:scriptId/download', async (req, res) => {
  const { scriptId } = req.params;
  
  try {
    const script = await prisma.characterScript.findUnique();

    if (!script) {
      res.status(404).json({ error: 'Script not found' });
      return;
    }

    // 生成文件名
    const fileName = `${script.character.name}_${script.type === 'draft' ? '初稿' : '终稿'}.txt`;
    
    // 设置响应头
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}`);
    
    // 返回文件内容
    res.send(script.content);
  } catch (error) {
    console.error('Error downloading script:', error);
    res.status(500).json({ error: 'Failed to download script' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 