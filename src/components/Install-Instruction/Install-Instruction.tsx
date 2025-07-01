import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Install-Instruction.module.css';

const InstallInstruction: React.FC = () => {
  const navigate = useNavigate();
  const [showScrollArrow, setShowScrollArrow] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState<boolean[]>([false, false, false, false, false]);
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Прокрутка к началу страницы при загрузке компонента - синхронно
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Дополнительная прокрутка к началу с задержкой для гарантии
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  // Функция для скролла вниз
  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  // Обработчик клика по логотипу для перехода на главную страницу
  const handleLogoClick = () => {
    navigate('/');
  };

  // Intersection Observer для анимации элементов
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              setTitleVisible(true);
            } else {
              // Проверяем, какой это шаг
              stepRefs.current.forEach((stepRef, index) => {
                if (entry.target === stepRef) {
                  setStepsVisible(prev => {
                    const newVisible = [...prev];
                    newVisible[index] = true;
                    return newVisible;
                  });
                }
              });
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Наблюдаем за элементами
    if (titleRef.current) observer.observe(titleRef.current);
    
    // Наблюдаем за каждым шагом
    stepRefs.current.forEach((stepRef) => {
      if (stepRef) observer.observe(stepRef);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Отслеживание скролла для показа/скрытия стрелки
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Скрываем стрелку, если пользователь прокрутил вниз или достиг конца страницы
      setShowScrollArrow(scrollPosition < windowHeight * 0.3 && scrollPosition + windowHeight < documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверяем изначальное положение

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <div className={styles.fullContainer}>
      {/* Навигационная панель */}
      <nav className={styles.navigation}>
        <div className={styles.navContent}>
          <div className={styles.navLogo} onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
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

      {/* Секция инструкций */}
      <div className={styles.instructionSection}>
        <div className={styles.instructionContent}>
          <h1 ref={titleRef} className={`${styles.instructionTitle} ${titleVisible ? styles.animate : ''}`}>Инструкция по установке OptiSodium</h1>
          
          <div className={styles.instructionSteps}>
            <div ref={el => stepRefs.current[0] = el} className={`${styles.instructionStep} ${stepsVisible[0] ? styles.animate : ''}`}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Подготовка системы</h3>
                <p>Убедитесь, что у вас установлена Java 17 или выше и последняя версия Minecraft Java Edition.</p>
                <ul>
                  <li>Скачайте Java с официального сайта Oracle</li>
                  <li>Запустите Minecraft Launcher</li>
                  <li>Проверьте наличие нужной версии игры</li>
                </ul>
              </div>
            </div>

            <div ref={el => stepRefs.current[1] = el} className={`${styles.instructionStep} ${stepsVisible[1] ? styles.animate : ''}`}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Скачивание модпака</h3>
                <p>Перейдите на вкладку "Модпак" и следуйте инструкциям для загрузки OptiSodium.</p>
                <ul>
                  <li>Выберите версию Minecraft</li>
                  <li>Выберите нужные моды</li>
                  <li>Нажмите "Загрузить сборку"</li>
                </ul>
              </div>
            </div>

            <div ref={el => stepRefs.current[2] = el} className={`${styles.instructionStep} ${stepsVisible[2] ? styles.animate : ''}`}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Установка Fabric Loader</h3>
                <p>OptiSodium работает на основе Fabric mod loader. Установите его перед запуском модов.</p>
                <ul>
                  <li>Скачайте Fabric Installer с fabricmc.net</li>
                  <li>Запустите установщик</li>
                  <li>Выберите версию Minecraft</li>
                  <li>Нажмите "Install"</li>
                </ul>
              </div>
            </div>

            <div ref={el => stepRefs.current[3] = el} className={`${styles.instructionStep} ${stepsVisible[3] ? styles.animate : ''}`}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Установка модов</h3>
                <p>Скопируйте скачанные моды в папку mods вашего Minecraft.</p>
                <ul>
                  <li>Откройте папку .minecraft/mods</li>
                  <li>Скопируйте файлы модов OptiSodium</li>
                  <li>Проверьте совместимость версий</li>
                </ul>
              </div>
            </div>

            <div ref={el => stepRefs.current[4] = el} className={`${styles.instructionStep} ${stepsVisible[4] ? styles.animate : ''}`}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h3>Запуск игры</h3>
                <p>Запустите Minecraft с профилем Fabric.</p>
                <ul>
                  <li>Откройте Minecraft Launcher</li>
                  <li>Выберите профиль Fabric</li>
                  <li>Нажмите "Играть"</li>
                  <li>Проверьте настройки производительности</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка возврата на главную страницу */}
      <div className={styles.backToHomeSection}>
        <button 
          className={styles.backToHomeBtn} 
          onClick={() => navigate('/')}
        >
          <span className={styles.backToHomeIcon}>🏠</span>
          Вернуться на главную страницу
        </button>
      </div>

      {/* Подвал */}
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

      {/* Анимированная стрелка скролла */}
      {showScrollArrow && (
        <div className={`${styles.scrollArrow} ${showScrollArrow ? styles.show : ''}`} onClick={scrollToNext}>
          ⬇
        </div>
      )}
    </div>
  );
};

export default InstallInstruction;
