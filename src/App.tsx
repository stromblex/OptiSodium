import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import './App.css';

// Ленивая загрузка компонентов
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const InstallInstruction = lazy(() => import('./components/Install-Instruction/Install-Instruction'));
const PreDownload = lazy(() => import('./components/PreDownload/PreDownload'));
const Download = lazy(() => import('./components/Download/Download'));

// Компонент загрузки
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  </div>
);

function App() {
  const location = useLocation();

  // Прокрутка к началу при изменении роута
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  // Прелоадинг компонентов при загрузке приложения
  useEffect(() => {
    // Прелоадим основные компоненты
    import('./components/HomePage/HomePage');
    import('./components/PreDownload/PreDownload');
    import('./components/Download/Download');
    import('./components/Install-Instruction/Install-Instruction');
  }, []);

  return (
    <div className="app-container">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instruction" element={<InstallInstruction />} />
          <Route path="/predownload" element={<PreDownload />} />
          <Route path="/download" element={<Download />} />
          
          {/* Устаревшие маршруты для обратной совместимости */}
          <Route path="/pre-download-1-19" element={<PreDownload />} />
          <Route path="/download-1-19" element={<Download />} />
          <Route path="/pre-download-1-19-1" element={<PreDownload />} />
          <Route path="/download-1-19-1" element={<Download />} />
          <Route path="/pre-download-1-19-2" element={<PreDownload />} />
          <Route path="/download-1-19-2" element={<Download />} />
          <Route path="/pre-download-1-19-3" element={<PreDownload />} />
          <Route path="/download-1-19-3" element={<Download />} />
          <Route path="/pre-download-1-19-4" element={<PreDownload />} />
          <Route path="/download-1-19-4" element={<Download />} />
          <Route path="/pre-download-1-20" element={<PreDownload />} />
          <Route path="/download-1-20" element={<Download />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;