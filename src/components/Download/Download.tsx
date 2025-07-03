import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import JSZip from 'jszip';
import { getVersionConfig, getModsForVersion, type Mod } from '../../data/modsConfig';
import styles from './Download.module.css';

const Download = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version') || '1.19';
  const modsParam = searchParams.get('mods');
  
  const versionConfig = getVersionConfig(version);
  const [selectedMods, setSelectedMods] = useState<Mod[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем доступные моды и устанавливаем выбранные
  useEffect(() => {
    const loadMods = async () => {
      if (!versionConfig || !modsParam) {
        navigate('/', { replace: true });
        return;
      }

      setIsLoading(true);
      try {
        const mods = await getModsForVersion(version);
        
        const modIds = modsParam.split(',');
        const filteredMods = mods.filter(mod => modIds.includes(mod.id));
        
        if (filteredMods.length === 0) {
          navigate('/', { replace: true });
          return;
        }
        
        setSelectedMods(filteredMods);
      } catch (error) {
        console.error('Ошибка загрузки модов:', error);
        navigate('/', { replace: true });
      }
      setIsLoading(false);
    };

    loadMods();
  }, [version, versionConfig, modsParam, navigate]);

  const totalSize = selectedMods.reduce((sum, mod) => sum + mod.size, 0);

  const getVersionPath = (version: string): string => {
    // Преобразуем версию в путь к папке с файлами
    if (version === '1.19') return 'Download1-19';
    if (version === '1.19.1') return 'Download1-19-1';
    if (version === '1.19.2') return 'Download1-19-2';
    if (version === '1.19.3') return 'Download1-19-3';
    if (version === '1.19.4') return 'Download1-19-4';
    if (version === '1.20') return 'Download1-20';
    if (version === '1.20.1') return 'Download1-20-1';
    return 'Download1-20-1'; // fallback
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const zip = new JSZip();
      const modsFolder = zip.folder("mods");
      const versionPath = getVersionPath(version);
      
      // Симуляция прогресса загрузки
      let progress = 0;
      const totalItems = selectedMods.length + 2; // +2 для config.zip и options.txt
      let currentItem = 0;
      
      // Загружаем моды
      for (let i = 0; i < selectedMods.length; i++) {
        const mod = selectedMods[i];
        
        try {
          // Используем реальное имя файла из конфигурации мода
          const fileName = mod.jarFileName || `${mod.id}.jar`;
          const response = await fetch(`/assets/${versionPath}/files/${fileName}`);
          
          if (response.ok) {
            const blob = await response.blob();
            modsFolder?.file(fileName, blob);
            console.log(`✅ Успешно загружен файл ${fileName}`);
          } else {
            console.warn(`❌ Файл ${fileName} не найден (${response.status}), создаем информационный файл`);
            // Если файл не найден, создаем фиктивный файл с информацией о моде
            const modInfo = `Мод: ${mod.name}\nОписание: ${mod.description}\nРазмер: ${mod.size} МБ\nСсылка: ${mod.url}`;
            modsFolder?.file(`${mod.id}_info.txt`, modInfo);
          }
        } catch (error) {
          console.error(`❌ Ошибка при загрузке файла для мода ${mod.name}:`, error);
          // Создаем файл с информацией о моде
          const modInfo = `Мод: ${mod.name}\nОписание: ${mod.description}\nРазмер: ${mod.size} МБ\nСсылка: ${mod.url}\nОшибка загрузки: ${error}`;
          modsFolder?.file(`${mod.id}_info.txt`, modInfo);
        }
        
        currentItem++;
        progress = Math.round((currentItem / totalItems) * 85); // 85% на загрузку файлов
        setDownloadProgress(progress);
        
        // Увеличенная задержка для более плавной визуализации прогресса
        await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 300));
      }

      // Загружаем файл options.txt
      try {
        const optionsResponse = await fetch(`/assets/${versionPath}/files/options.txt`);
        if (optionsResponse.ok) {
          const optionsBlob = await optionsResponse.blob();
          zip.file('options.txt', optionsBlob);
          console.log('✅ Успешно загружен файл options.txt');
        } else {
          console.warn('❌ Файл options.txt не найден, создаем базовый');
          const defaultOptions = `# Базовые настройки OptiSodium\n# Этот файл содержит оптимальные настройки для максимальной производительности\nfpsLimit:260\nrenderDistance:12\nsimulationDistance:8\ngraphics:fast\nao:false\nbiomeBlendRadius:0\nentityDistanceScaling:0.75\nmaxFps:260`;
          zip.file('options.txt', defaultOptions);
        }
      } catch (error) {
        console.error('❌ Ошибка при загрузке options.txt:', error);
        const defaultOptions = `# Базовые настройки OptiSodium\n# Этот файл содержит оптимальные настройки для максимальной производительности\nfpsLimit:260\nrenderDistance:12\nsimulationDistance:8\ngraphics:fast\nao:false\nbiomeBlendRadius:0\nentityDistanceScaling:0.75\nmaxFps:260`;
        zip.file('options.txt', defaultOptions);
      }
      
      currentItem++;
      progress = Math.round((currentItem / totalItems) * 85);
      setDownloadProgress(progress);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Добавляем config.zip в корень архива
      try {
        const configZipResponse = await fetch(`/assets/${versionPath}/files/config.zip`);
        if (configZipResponse.ok) {
          const configZipBlob = await configZipResponse.blob();
          zip.file('config.zip', configZipBlob);
          console.log('✅ Успешно добавлен config.zip в архив');
        } else {
          console.warn('❌ config.zip не найден, архив будет без конфигов');
        }
      } catch (error) {
        console.error('❌ Ошибка при добавлении config.zip:', error);
      }
      
      currentItem++;
      progress = Math.round((currentItem / totalItems) * 85);
      setDownloadProgress(progress);
      
      // Создание ZIP файла с дополнительной анимацией
      setDownloadProgress(90);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const content = await zip.generateAsync({
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: {
          level: 6
        }
      });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setDownloadProgress(100);
      
      // Создание ссылки для скачивания
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `optisodium-${version.replace('.', '')}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Завершение загрузки
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadComplete(true);
      }, 1500);
      
    } catch (error) {
      console.error('Ошибка при создании архива:', error);
      alert('Произошла ошибка при создании архива. Попробуйте еще раз.');
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRestart = () => {
    navigate('/');
  };

  // Обработчик клика по логотипу для перехода на главную страницу
  const handleLogoClick = () => {
    navigate('/');
  };

  if (!versionConfig) {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.errorMessage}>
          <h2>Версия не найдена</h2>
          <p>Запрашиваемая версия Minecraft не поддерживается.</p>
          <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.errorMessage}>
          <h2>Загрузка модов...</h2>
          <p>Проверяем доступные моды для версии {version}</p>
        </div>
      </div>
    );
  }

  if (selectedMods.length === 0) {
    return (
      <div className={styles.fullContainer}>
        <div className={styles.errorMessage}>
          <h2>Ошибка загрузки</h2>
          <p>Не удалось загрузить конфигурацию модов для выбранной версии.</p>
          <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.fullContainer}>
      <div className={styles.mainContent}>
        <div className={styles.contentPanel}>
          {/* Заголовок */}
          <div className={styles.header}>
            <div className={styles.logo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <img 
                src="/assets/common/icon.png" 
                alt="modpack" 
                className={styles.logoIcon}
              />
              <span className={styles.logoText}>OptiSodium {version}</span>
            </div>
          </div>

          {/* Индикатор шагов */}
          <div className={styles.stepIndicator}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepText}>Выбор версии</span>
            </div>
            <div className={styles.stepArrow}>››</div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepText}>Выбор модов</span>
            </div>
            <div className={styles.stepArrow}>››</div>
            <div className={`${styles.step} ${styles.active}`}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepText}>Загрузка модпака</span>
            </div>
          </div>

          <div className={styles.content}>
            {!downloadComplete ? (
              <>
                <h2 className={styles.title}>
                  Выбрано {selectedMods.length} модов для {versionConfig.displayName}
                </h2>
                
                {!isDownloading ? (
                  <div className={styles.downloadInfo}>
                    <div className={styles.downloadCard}>
                      <div className={styles.downloadIcon}>📦</div>
                      <div className={styles.downloadDetails}>
                        <h3>Готов к загрузке</h3>
                        <p>Размер архива: ~{totalSize.toFixed(1)} МБ (.zip)</p>
                      </div>
                    </div>
                    
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                      Скачать моды: ~ {totalSize.toFixed(1)} МБ (.zip) 
                      <span className={styles.downloadIcon}>⬇</span>
                    </button>
                  </div>
                ) : (
                  <div className={styles.downloadProgress}>
                    <div className={styles.loadingAnimation}>
                      <div className={styles.spinner}>
                        <div className={styles.spinnerInner}></div>
                      </div>
                      <div className={styles.loadingDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    
                    <div className={styles.progressContainer}>
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill}
                          style={{ width: `${downloadProgress}%` }}
                        >
                          <div className={styles.progressGlow}></div>
                        </div>
                      </div>
                      <span className={styles.progressText}>{downloadProgress}%</span>
                    </div>
                    
                    <div className={styles.progressSteps}>
                      <div className={`${styles.step} ${downloadProgress >= 10 ? styles.active : ''}`}>
                        <div className={styles.stepIcon}>📦</div>
                        <span>Подготовка модов</span>
                      </div>
                      <div className={`${styles.step} ${downloadProgress >= 40 ? styles.active : ''}`}>
                        <div className={styles.stepIcon}>⚙️</div>
                        <span>Конфиги и настройки</span>
                      </div>
                      <div className={`${styles.step} ${downloadProgress >= 80 ? styles.active : ''}`}>
                        <div className={styles.stepIcon}>🚀</div>
                        <span>Финализация</span>
                      </div>
                    </div>
                    
                    <p className={styles.progressLabel}>
                      {downloadProgress < 25 ? 'Собираем моды в архив...' : 
                       downloadProgress < 50 ? 'Добавляем конфигурационные файлы...' :
                       downloadProgress < 75 ? 'Настраиваем оптимальные параметры...' : 
                       downloadProgress < 90 ? 'Создаем финальный архив...' : 
                       'Завершаем загрузку...'}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successAnimation}>
                  <div className={styles.successIcon}></div>
                  <div className={styles.successParticles}></div>
                </div>
                <h2 className={styles.successTitle}>Загрузка завершена!</h2>
                <p className={styles.successDescription}>
                  OptiSodium модпак успешно загружен и готов к установке
                </p>
                <div className={styles.successActions}>
                  <button 
                    className={styles.instructionsBtn} 
                    onClick={() => {
                      // Прокрутка к началу перед переходом
                      window.scrollTo(0, 0);
                      document.documentElement.scrollTop = 0;
                      document.body.scrollTop = 0;
                      navigate('/instruction');
                    }}
                  >
                    Инструкция по установке
                    <span className={styles.btnIcon}>📖</span>
                  </button>
                  <button className={styles.restartBtn} onClick={handleRestart}>
                    Создать новый модпак
                    <span className={styles.btnIcon}>🔄</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Кнопка назад */}
        {!downloadComplete && (
          <button className={styles.backBtn} onClick={handleBack}>
            <span className={styles.backArrow}>←</span> Назад
          </button>
        )}
      </div>
    </div>
  );
};

export default Download;
