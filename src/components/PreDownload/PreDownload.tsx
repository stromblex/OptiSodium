import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getVersionConfig, getModsForVersion, type Mod } from '../../data/modsConfig';
import styles from './PreDownload.module.css';

const PreDownload = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('version') || '1.19';
  
  const versionConfig = getVersionConfig(version);
  const [availableMods, setAvailableMods] = useState<Mod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загружаем доступные моды для выбранной версии
  useEffect(() => {
    const loadMods = async () => {
      if (!versionConfig) {
        navigate('/', { replace: true });
        return;
      }
      
      setIsLoading(true);
      try {
        const mods = await getModsForVersion(version);
        setAvailableMods(mods);
      } catch (error) {
        console.error('Ошибка загрузки модов:', error);
        // В случае ошибки используем базовую конфигурацию
        if (versionConfig) {
          setAvailableMods(versionConfig.mods);
        }
      }
      setIsLoading(false);
    };

    loadMods();
  }, [version, versionConfig, navigate]);

  // Начальное состояние с выбранными обязательными модами
  const [selectedMods, setSelectedMods] = useState<Set<string>>(new Set());
  
  // Обновляем выбранные моды когда загружаются доступные
  useEffect(() => {
    if (availableMods.length > 0) {
      const requiredMods = availableMods.filter(mod => mod.required).map(mod => mod.id);
      setSelectedMods(new Set(requiredMods));
    }
  }, [availableMods]);

  // Обработчик клика по логотипу для перехода на главную страницу
  const handleLogoClick = () => {
    navigate('/');
  };

  const handleModToggle = (modId: string) => {
    const mod = availableMods.find(m => m.id === modId);
    if (!mod || mod.required) return;

    const newSelectedMods = new Set(selectedMods);
    
    if (newSelectedMods.has(modId)) {
      // Убираем мод и все моды, которые от него зависят
      const dependentMods = availableMods.filter(m => m.dependsOn === modId);
      newSelectedMods.delete(modId);
      dependentMods.forEach(depMod => newSelectedMods.delete(depMod.id));
    } else {
      // Добавляем мод и его зависимости
      newSelectedMods.add(modId);
      if (mod.dependsOn && !newSelectedMods.has(mod.dependsOn)) {
        newSelectedMods.add(mod.dependsOn);
      }
    }
    
    setSelectedMods(newSelectedMods);
  };

  const selectedModsCount = selectedMods.size;
  const totalSize = availableMods.filter(mod => selectedMods.has(mod.id)).reduce((sum, mod) => sum + mod.size, 0);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedModsCount === 0) return;
    
    // Преобразуем Set в массив ID
    const selectedModIds = Array.from(selectedMods);
    
    // Переходим на страницу загрузки с параметрами
    navigate(`/download?version=${version}&mods=${selectedModIds.join(',')}`);
  };

  const handleSelectAll = () => {
    const allModIds = new Set(availableMods.map(mod => mod.id));
    setSelectedMods(allModIds);
  };

  const handleDeselectAll = () => {
    const requiredModIds = new Set(availableMods.filter(mod => mod.required).map(mod => mod.id));
    setSelectedMods(requiredModIds);
  };

  const isModDisabled = (mod: Mod) => {
    if (mod.required) return true;
    if (mod.dependsOn && !selectedMods.has(mod.dependsOn)) return true;
    return false;
  };

  const getModsByCategory = (required: boolean) => {
    return availableMods.filter(mod => mod.required === required);
  };

  if (!versionConfig) {
    return (
      <div className={styles.container}>
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
      <div className={styles.container}>
        <div className={styles.loadingMessage}>
          <h2>Загрузка модов...</h2>
          <p>Проверяем доступные моды для версии {version}</p>
        </div>
      </div>
    );
  }

  const requiredMods = getModsByCategory(true);
  const optionalMods = getModsByCategory(false);

  return (
    <div className={styles.container}>
      {/* Главный контент */}
      <main className={styles.mainContent}>
        {/* Заголовок */}
        <section className={styles.header}>
          <div className={styles.headerTop}>
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
            <div className={`${styles.step} ${styles.active}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepText}>Выбор модов</span>
            </div>
            <div className={styles.stepArrow}>››</div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepText}>Загрузка модпака</span>
            </div>
          </div>

          <div className={styles.description}>
            <h1 className={styles.title}>
              Настройте ваш OptiSodium модпак для {versionConfig.displayName}
            </h1>
            <p className={styles.subtitle}>
              Базовая оптимизация включена. Если у вас не самый мощный компьютер — лучше оставить только обязательные моды.
            </p>
          </div>
        </section>

        {/* Секция выбора модов */}
        <section className={styles.modsSection}>
          {/* Обязательные моды */}
          <div className={styles.modCategory}>
            <div className={styles.categoryHeader}>
              <h2 className={styles.categoryTitle}>
                <span className={styles.categoryIcon}>⚡</span>
                Основные оптимизации
                <span className={styles.categoryBadge}>Обязательные</span>
              </h2>
              <p className={styles.categoryDescription}>
                Эти моды обеспечивают базовую оптимизацию производительности и включены в модпак по умолчанию
              </p>
            </div>
            
            <div className={styles.modsGrid}>
              {requiredMods.map((mod) => (
                <div key={mod.id} className={`${styles.modCard} ${styles.required}`}>
                  <div className={styles.modIcon}>
                    <img 
                      src={`/assets/common/${mod.icon}`} 
                      alt={mod.name}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/common/icon.png';
                      }}
                    />
                    <div className={styles.requiredBadge}>✓</div>
                  </div>
                  
                  <div className={styles.modInfo}>
                    <div className={styles.modHeader}>
                      <h3 className={styles.modName}>{mod.name}</h3>
                      <span className={styles.modSize}>{mod.size} МБ</span>
                    </div>
                    <p className={styles.modDescription}>{mod.description}</p>
                    
                    <div className={styles.modFooter}>
                      <a 
                        href={mod.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.modLink}
                      >
                        Подробнее ↗
                      </a>
                      <span className={styles.requiredLabel}>Обязательный</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Дополнительные моды */}
          <div className={styles.modCategory}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryTitleRow}>
                <h2 className={styles.categoryTitle}>
                  <span className={styles.categoryIcon}>🎮</span>
                  Дополнительные возможности
                  <span className={styles.categoryBadge + ' ' + styles.optional}>Опциональные</span>
                </h2>
                <div className={styles.categoryActions}>
                  <button 
                    className={styles.actionButton}
                    onClick={handleSelectAll}
                  >
                    Выбрать все
                  </button>
                  <button 
                    className={styles.actionButton}
                    onClick={handleDeselectAll}
                  >
                    Только обязательные
                  </button>
                </div>
              </div>
              <p className={styles.categoryDescription}>
                Улучшенная оптимизация, фиксы багов и функциональность OptiFine.
              </p>
            </div>
            
            <div className={styles.modsGrid}>
              {optionalMods.map((mod) => {
                const isSelected = selectedMods.has(mod.id);
                const isDisabled = isModDisabled(mod);
                
                return (
                  <div 
                    key={mod.id} 
                    className={`${styles.modCard} ${isSelected ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
                    onClick={() => !isDisabled && handleModToggle(mod.id)}
                  >
                    <div className={styles.modIcon}>
                      <img 
                        src={`/assets/common/${mod.icon}`} 
                        alt={mod.name}
                        onError={(e) => {
                          e.currentTarget.src = '/assets/common/icon.png';
                        }}
                      />
                      <div className={`${styles.selectionIndicator} ${isSelected ? styles.selected : ''}`}>
                        {isSelected ? '✓' : '+'}
                      </div>
                    </div>
                    
                    <div className={styles.modInfo}>
                      <div className={styles.modHeader}>
                        <h3 className={styles.modName}>{mod.name}</h3>
                        <span className={styles.modSize}>{mod.size} МБ</span>
                      </div>
                      <p className={styles.modDescription}>{mod.description}</p>
                      
                      <div className={styles.modFooter}>
                        <a 
                          href={mod.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.modLink}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Подробнее ↗
                        </a>
                        {mod.dependsOn && versionConfig && (
                          <span className={styles.dependencyLabel}>
                            Требует: {versionConfig.mods.find(m => m.id === mod.dependsOn)?.name}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>💡 Хотите сделать Minecraft еще красивее?</h3>
              <p className={styles.infoDescription}>
                Прокачайте визуал — шейдеры, текстуры, анимации и куча других эффектов ждут вас.
              </p>
            </div>
            
            <a 
              href={`https://modrinth.com/mods?f=categories:decoration&v=${version}&g=categories:fabric`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.decorationButton}
            >
              <span className={styles.decorationButtonText}>Сделать майнкрафт красивее</span>
              <span className={styles.decorationButtonArrow}>→</span>
            </a>
          </div>
        </section>
      </main>

      {/* Нижняя панель */}
      <aside className={styles.sidebar}>
        <div className={styles.statsPanel}>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statText}>Выбрано модов: <span className={styles.statValue}>{selectedModsCount}</span></span>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statText}>Общий размер: <span className={styles.statValue}>{totalSize.toFixed(1)} МБ</span></span>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statText}>Обязательных: <span className={styles.statValue}>{requiredMods.length}</span></span>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statText}>Опциональных: <span className={styles.statValue}>{optionalMods.filter(m => selectedMods.has(m.id)).length}</span></span>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button 
              className={styles.backButton} 
              onClick={handleBack}
            >
              ← Назад
            </button>
            
            <button 
              className={styles.downloadButton} 
              onClick={handleContinue}
              disabled={selectedModsCount === 0}
            >
              Продолжить →
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PreDownload;
