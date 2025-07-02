import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import './App.css';

// Ленивая загрузка компонентов
const HomePage = lazy(() => import('./components/HomePage/HomePage'));
const InstallInstruction = lazy(() => import('./components/Install-Instruction/Install-Instruction'));
const PreDownload119 = lazy(() => import('./components/PreDownload1-19/PreDownload1-19'));
const Download119 = lazy(() => import('./components/Download1-19/Download1-19'));
const PreDownload1191 = lazy(() => import('./components/PreDownload1-19-1/PreDownload1-19-1'));
const Download1191 = lazy(() => import('./components/Download1-19-1/Download1-19-1'));
const PreDownload1192 = lazy(() => import('./components/PreDownload1-19-2/PreDownload1-19-2'));
const Download1192 = lazy(() => import('./components/Download1-19-2/Download1-19-2'));
const PreDownload1193 = lazy(() => import('./components/PreDownload1-19-3/PreDownload1-19-3'));
const Download1193 = lazy(() => import('./components/Download1-19-3/Download1-19-3'));
const PreDownload1194 = lazy(() => import('./components/PreDownload1-19-4/PreDownload1-19-4'));
const Download1194 = lazy(() => import('./components/Download1-19-4/Download1-19-4'));
const PreDownload120 = lazy(() => import('./components/PreDownload1-20/PreDownload1-20'));
const Download120 = lazy(() => import('./components/Download1-20/Download1-20'));

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
    import('./components/PreDownload1-19/PreDownload1-19');
    import('./components/Download1-19/Download1-19');
    import('./components/Install-Instruction/Install-Instruction');
    import('./components/PreDownload1-19-1/PreDownload1-19-1');
    import('./components/Download1-19-1/Download1-19-1');
    import('./components/PreDownload1-19-2/PreDownload1-19-2');
    import('./components/Download1-19-2/Download1-19-2');
    import('./components/PreDownload1-19-3/PreDownload1-19-3');
    import('./components/Download1-19-3/Download1-19-3');
    import('./components/PreDownload1-19-4/PreDownload1-19-4');
    import('./components/Download1-19-4/Download1-19-4');
    import('./components/PreDownload1-20/PreDownload1-20');
    import('./components/Download1-20/Download1-20');
  }, []);

  return (
    <div className="app-container">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instruction" element={<InstallInstruction />} />
          <Route path="/pre-download-1-19" element={<PreDownload119 />} />
          <Route path="/download-1-19" element={<Download119 />} />
          <Route path="/pre-download-1-19-1" element={<PreDownload1191 />} />
          <Route path="/download-1-19-1" element={<Download1191 />} />
          <Route path="/pre-download-1-19-2" element={<PreDownload1192 />} />
          <Route path="/download-1-19-2" element={<Download1192 />} />
          <Route path="/pre-download-1-19-3" element={<PreDownload1193 />} />
          <Route path="/download-1-19-3" element={<Download1193 />} />
          <Route path="/pre-download-1-19-4" element={<PreDownload1194 />} />
          <Route path="/download-1-19-4" element={<Download1194 />} />
          <Route path="/pre-download-1-20" element={<PreDownload120 />} />
          <Route path="/download-1-20" element={<Download120 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;