import './App.css';
import HomePage from './pages/HomePage';
import ConfluxPage from './pages/ConfluxPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { pullAllDataFromGist } from '@/lib/gistSync';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await pullAllDataFromGist();
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <div className="text-lg font-semibold">Loading data from Gist...</div>
          <div className="mt-2 text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/brink" element={<HomePage />} />
        <Route path="/" element={<ConfluxPage />} />
      </Routes>
    </Router>
  );
}

export default App;