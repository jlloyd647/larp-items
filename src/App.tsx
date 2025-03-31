import './App.css';
import HomePage from './pages/HomePage';
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

  return <HomePage />;
}

export default App;