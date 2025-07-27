import React from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Dashboard />
    </div>
  );
};

export default App;