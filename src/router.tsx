import { createHashRouter } from 'react-router-dom'
import ScriptEditor from './components/ScriptEditor'
import SceneList from './components/SceneList'
import SceneEditor from './components/SceneEditor'
import OutlinePage from './components/OutlinePage'
import CharactersPage from './components/CharactersPage'
import RelationsPage from './components/RelationsPage'
import ChaptersPage from './components/ChaptersPage'
import HomePage from './components/HomePage'
import ComingSoonPage from './components/ComingSoonPage'
import KnowledgeDetailPage from './components/KnowledgeDetailPage'
import KnowledgeUploadPage from './components/KnowledgeUploadPage'
import App from './App'

// 使用HashRouter而不是BrowserRouter，可以避免部署时的路径问题
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'editor',
        element: <ScriptEditor />
      },
      {
        path: 'outline',
        element: <OutlinePage />
      },
      {
        path: 'characters',
        element: <CharactersPage />
      },
      {
        path: 'relations',
        element: <RelationsPage />
      },
      {
        path: 'chapters',
        element: <ChaptersPage />
      },
      {
        path: 'scenes',
        element: <SceneList />
      },
      {
        path: 'scenes/:sceneId',
        element: <SceneEditor />
      },
      // 知识库相关路由
      {
        path: 'knowledge/new',
        element: <ComingSoonPage />
      },
      {
        path: 'knowledge/:knowledgeId',
        element: <KnowledgeDetailPage />
      },
      {
        path: 'knowledge/:knowledgeId/upload',
        element: <KnowledgeUploadPage />
      }
    ]
  }
])

export default router 