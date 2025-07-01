import { useState, useEffect, useRef } from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVersion, setSelectedVersion] = useState('1.21.5');
  const [isLoading, setIsLoading] = useState(false);
  const [isInstallerVisible, setIsInstallerVisible] = useState(false);
  
  const installerRef = useRef<HTMLDivElement>(null);

  const versions = [
    '1.21.5', '1.21.4', '1.21.3', '1.21.2', '1.21.1', '1.21', '1.20.2', '1.20.1', '1.20',
    '1.19.4', '1.19.3', '1.19.2', '1.19.1', '1.19'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInstallerVisible(true);
            observer.unobserve(entry.target); // Остановить наблюдение после первого появления
          }
        });
      },
      {
        threshold: 0.3 // Запустить анимацию когда 30% элемента видно
      }
    );

    if (installerRef.current) {
      observer.observe(installerRef.current);
    }

    return () => {
      if (installerRef.current) {
        observer.unobserve(installerRef.current);
      }
    };
  }, []);

  const handleScrollToInstaller = () => {
    // Небольшая задержка для плавности
    setTimeout(() => {
      const installerSection = document.getElementById('installer-section');
      if (installerSection) {
        installerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedVersion === '1.19') {
      // Переход на страницу pre-download для версии 1.19
      window.location.href = '/pre-download-1-19';
    } else if (currentStep === 1 && selectedVersion === '1.19.1') {
      // Переход на страницу pre-download для версии 1.19.1
      window.location.href = '/pre-download-1-19-1';
    } else if (currentStep === 1 && selectedVersion === '1.19.2') {
      // Переход на страницу pre-download для версии 1.19.2
      window.location.href = '/pre-download-1-19-2';
    } else if (currentStep === 1 && selectedVersion === '1.19.3') {
      // Переход на страницу pre-download для версии 1.19.3
      window.location.href = '/pre-download-1-19-3';
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert('OptiSodium готов к работе!');
        setCurrentStep(1);
      }, 2000);
    }
  };

  return (
    <div className={styles.fullContainer}>
      {/* Навигационная панель */}
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navLogo}>
            <img 
              src="/assets/common/icon.png" 
              alt="OptiSodium" 
              className={styles.navLogoIcon}
            />
            <span className={styles.navLogoText}>OptiSodium</span>
          </div>
          <div className={styles.navAuthor}>
            <span className={styles.authorText}>Created by</span>
            <img 
              src="/assets/common/stromblex.png" 
              alt="StrombleX" 
              className={styles.authorAvatar}
            />
            <span className={styles.authorName}>StrombleX</span>
          </div>
          <div className={styles.navCopyright}>
            © 2025 • Minecraft Performance Optimization
          </div>
        </div>
      </nav>

      {/* Секция с описанием */}
      <div className={styles.introSection}>
        <div className={styles.introContent}>
          <div className={styles.textSection}>
            <h1 className={styles.mainTitle}>OptiSodium</h1>
            <div className={styles.description}>
              <p className={styles.descriptionText}>
                Оптимизирует производительность игры, гарантируя плавный геймплей и 
                улучшенную стабильность.
              </p>
              <p className={styles.descriptionText}>
                Теперь вы сможете наслаждаться Minecraft без лагов и понижения 
                скорости работы игры.
              </p>
            </div>
          </div>
          <div className={styles.imageSection}>
            <img 
              src="/assets/HomePage/images/optisodium.png" 
              alt="OptiSodium Characters"
              className={styles.heroImage}
            />
          </div>
        </div>
        
        <div className={styles.scrollIndicator} onClick={handleScrollToInstaller}>
          <div className={styles.scrollArrow}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Секция установщика */}
      <div id="installer-section" className={styles.installerSection}>
        <div 
          ref={installerRef}
          className={`${styles.mainPanel} ${isInstallerVisible ? styles.animate : ''}`}
        >
          <div className={styles.header}>
            <div className={styles.logo}>
              <img 
                src="/assets/common/icon.png" 
                alt="OptiSodium" 
                className={styles.logoIcon}
              />
              <span className={styles.logoText}>OptiSodium</span>
            </div>
          </div>

          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepText}>Выбор версии</span>
            </div>
            <div className={styles.stepArrow}>››</div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepText}>Выбор модов</span>
            </div>
            <div className={styles.stepArrow}>››</div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepText}>Загрузка модпака</span>
            </div>
          </div>

          <div className={styles.content}>
            {currentStep === 1 && (
              <div className={styles.stepContent}>
                <h2>Выберите версию Minecraft Java Edition, для которой хотите установить моды.</h2>
                <p>Рекомендуем использовать приоритетную версию — она обеспечивает стабильную работу и наилучшую совместимость модов.</p>
                
                <div className={styles.versionSelector}>
                  <label>Версия Minecraft</label>
                  <div className={styles.selectWrapper}>
                    <select 
                      value={selectedVersion} 
                      onChange={(e) => setSelectedVersion(e.target.value)}
                      className={styles.select}
                    >
                      {versions.map((version, index) => (
                        <option key={version} value={version}>
                          {version} {index === 0 ? '(Рекомендуемая)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.versionNote}>
                    <span className={styles.noteIcon}>💡</span>
                    <span>Некоторые моды могут быть недоступны или работать нестабильно на других версиях игры.</span>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.stepContent}>
                <h2>Выбор модов для установки</h2>
                <p>Выберите моды, которые хотите включить в сборку OptiSodium.</p>
                
                <div className={styles.modsList}>
                  <div className={styles.modItem}>
                    <input type="checkbox" id="sodium" defaultChecked />
                    <label htmlFor="sodium">Sodium - оптимизация рендеринга</label>
                  </div>
                  <div className={styles.modItem}>
                    <input type="checkbox" id="lithium" defaultChecked />
                    <label htmlFor="lithium">Lithium - оптимизация сервера</label>
                  </div>
                  <div className={styles.modItem}>
                    <input type="checkbox" id="phosphor" defaultChecked />
                    <label htmlFor="phosphor">Phosphor - оптимизация освещения</label>
                  </div>
                  <div className={styles.modItem}>
                    <input type="checkbox" id="iris" />
                    <label htmlFor="iris">Iris - поддержка шейдеров</label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className={styles.stepContent}>
                <h2>Загрузка и установка сборки</h2>
                <p>Подготавливаем вашу сборку OptiSodium с выбранными модами.</p>
                
                {isLoading ? (
                  <div className={styles.loadingContainer}>
                    <div className={styles.loadingBar}>
                      <div className={styles.loadingProgress}></div>
                    </div>
                    <p>Загружаем моды и настройки...</p>
                  </div>
                ) : (
                  <div className={styles.readyContainer}>
                    <div className={styles.checkmark}>✓</div>
                    <p>Готово к запуску!</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button 
              className={styles.continueBtn}
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : currentStep === 3 ? 'Запустить' : 'Продолжить'}
              {!isLoading && <span className={styles.arrow}>→</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Подвал с авторством */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img 
              src="/assets/common/icon.png" 
              alt="OptiSodium" 
              className={styles.footerLogoIcon}
            />
            <span className={styles.footerLogoText}>OptiSodium</span>
          </div>
          <p className={styles.copyright}>
            Copyright © OptiSodium 2025. Все права защищены. Сервер OptiSodium не относится к Mojang Studios.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
