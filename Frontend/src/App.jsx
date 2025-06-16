import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Analyzer from './pages/Analyzer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path = "/analyze" element= {<Analyzer/>}/>
        </Routes>
      </main>
    </div>
    );
}

export default App;