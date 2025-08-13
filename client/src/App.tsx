import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import ComparisonPage from './pages/ComparisonPage';
import Header from './components/layout/Header';

function App() {
  return (
    <div className="min-h-screen">
      <Header />   
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/country/:code" element={<DetailPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;