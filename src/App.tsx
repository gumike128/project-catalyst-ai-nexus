
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { AIAssistant } from './pages/AIAssistant';
import { CreativeStudio } from './pages/CreativeStudio';
import { Settings } from './pages/Settings';
import { LLMProviderSettings } from './pages/LLMProviderSettings';
import { UserProfile } from './pages/UserProfile';
import NotFound from './pages/NotFound';
import './i18n';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/creative-studio" element={<CreativeStudio />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/llm-providers" element={<LLMProviderSettings />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
