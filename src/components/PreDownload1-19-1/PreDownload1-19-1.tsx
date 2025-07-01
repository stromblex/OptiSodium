import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreDownload1-19-1.module.css';

interface Mod {
  id: string;
  name: string;
  size: number; // размер в МБ
  description: string;
  url: string;
  icon: string;
  required: boolean;
  dependsOn?: string; // ID мода, от которого зависит этот мод
}

const PreDownload1191 = () => {
  const navigate = useNavigate();

  // Обработчик клика по логотипу для перехода на главную страницу
  const handleLogoClick = () => {
    navigate('/');
  };

  const mods: Mod[] = [
    {
      id: 'cloth-config',
      name: 'Cloth Config API',
      size: 1.11,
      description: 'Библиотека для создания конфигурационных экранов в модах. Предоставляет унифицированный интерфейс для настройки модов с красивым GUI. Является зависимостью для многих популярных модов.',
      url: 'https://modrinth.com/mod/cloth-config',
      icon: 'Cloth Config API.webp',
      required: true
    },
    {
      id: 'dynamic-fps',
      name: 'Dynamic FPS',
      size: 0.09,
      description: 'Автоматически снижает FPS когда окно Minecraft неактивно или свёрнуто. Помогает сэкономить ресурсы процессора и видеокарты при работе в фоне.',
      url: 'https://modrinth.com/mod/dynamic-fps',
      icon: 'Dynamic FPS.webp',
      required: true
    },
    {
      id: 'enhancedblockentities',
      name: 'Enhanced Block Entities',
      size: 0.43,
      description: 'Оптимизирует рендеринг блочных сущностей (сундуки, печи и т.д.), заменяя их на более быстрые baked models. Значительно повышает производительность в локациях с большим количеством таких блоков.',
      url: 'https://modrinth.com/mod/ebe',
      icon: 'Enhanced Block Entities.webp',
      required: true
    },
    {
      id: 'entityculling',
      name: 'EntityCulling',
      size: 0.07,
      description: 'Скрывает рендеринг сущностей, которые находятся за стенами и не видны игроку. Существенно повышает FPS в местах с большим количеством мобов и игроков.',
      url: 'https://modrinth.com/mod/entityculling',
      icon: 'Entity Culling.webp',
      required: true
    },
    {
      id: 'ferritecore',
      name: 'FerriteCore',
      size: 0.11,
      description: 'Оптимизирует использование памяти, сокращая потребление RAM на 30-40%. Особенно полезен при игре с большим количеством модов или на слабых компьютерах.',
      url: 'https://modrinth.com/mod/ferrite-core',
      icon: 'FerriteCore.webp',
      required: true
    },
    {
      id: 'ImmediatelyFast',
      name: 'ImmediatelyFast',
      size: 0.17,
      description: 'Ускоряет немедленный рендеринг интерфейса и HUD элементов. Оптимизирует отрисовку GUI, что особенно заметно при использовании модов с интерфейсом.',
      url: 'https://modrinth.com/mod/immediatelyfast',
      icon: 'ImmediatelyFast.webp',
      required: true
    },
    {
      id: 'language-reload',
      name: 'Language Reload',
      size: 0.05,
      description: 'Позволяет перезагружать языковые файлы без перезапуска игры. Полезно для разработчиков ресурс-паков и переводчиков модов.',
      url: 'https://modrinth.com/mod/language-reload',
      icon: 'Language Reload.webp',
      required: true
    },
    {
      id: 'lithium',
      name: 'Lithium',
      size: 0.45,
      description: 'Всесторонняя оптимизация серверной части игры. Улучшает производительность ИИ мобов, физики блоков, генерации мира и многих других систем без изменения игровой механики.',
      url: 'https://modrinth.com/mod/lithium',
      icon: 'Lithium.webp',
      required: true
    },
    {
      id: 'main-menu-credits',
      name: 'Main Menu Credits',
      size: 0.01,
      description: 'Добавляет информацию о модах и их создателях в главное меню игры. Показывает список установленных модов прямо на стартовом экране.',
      url: 'https://modrinth.com/mod/main-menu-credits',
      icon: 'Main Menu Credits.webp',
      required: true
    },
    {
      id: 'moreculling',
      name: 'More Culling',
      size: 1.11,
      description: 'Расширенная система отсечения (culling) для блоков и предметов. Не рендерит невидимые грани блоков, что значительно повышает производительность.',
      url: 'https://modrinth.com/mod/moreculling',
      icon: 'More Culling.webp',
      required: true
    },
    {
      id: 'fabric-api',
      name: 'Fabric API',
      size: 1.43,
      description: 'Основная библиотека для модов на Fabric. Предоставляет базовые API и хуки, необходимые для работы большинства модов на платформе Fabric.',
      url: 'https://modrinth.com/mod/fabric-api',
      icon: 'Fabric API.webp',
      required: true
    },
    {
      id: 'reeses_sodium_options',
      name: 'Reese\'s Sodium Options',
      size: 0.05,
      description: 'Альтернативное меню настроек для мода Sodium с улучшенным интерфейсом. Делает настройки более удобными и понятными для пользователей.',
      url: 'https://modrinth.com/mod/reeses-sodium-options',
      icon: 'Reese\'s Sodium Options.webp',
      required: true,
      dependsOn: 'sodium'
    },
    {
      id: 'smoothboot',
      name: 'Smooth Boot',
      size: 0.08,
      description: 'Оптимизирует загрузку игры, распределяя нагрузку между CPU ядрами. Уменьшает время запуска и делает загрузку более плавной.',
      url: 'https://modrinth.com/mod/smoothboot-fabric',
      icon: 'Smooth Boot (Fabric).webp',
      required: true
    },
    {
      id: 'sodium',
      name: 'Sodium',
      size: 1.31,
      description: 'Мощная оптимизация рендеринга, значительно повышающая FPS. Полностью переписывает систему отрисовки мира, обеспечивая прирост производительности до 400%.',
      url: 'https://modrinth.com/mod/sodium',
      icon: 'Sodium.webp',
      required: true
    },
    {
      id: 'sodium-extra',
      name: 'Sodium Extra',
      size: 0.24,
      description: 'Дополнительные настройки для мода Sodium. Добавляет больше опций оптимизации и возвращает некоторые настройки из ванильного Minecraft.',
      url: 'https://modrinth.com/mod/sodium-extra',
      icon: 'Sodium Extra.webp',
      required: true,
      dependsOn: 'sodium'
    },
    {
      id: 'starlight',
      name: 'Starlight',
      size: 0.12,
      description: 'Полностью переписанный движок освещения для максимальной производительности. Ускоряет генерацию света в 10-20 раз по сравнению с ванильным алгоритмом.',
      url: 'https://modrinth.com/mod/starlight',
      icon: 'Starlight (Fabric).webp',
      required: true
    },
    {
      id: 'vmp',
      name: 'Very Many Players',
      size: 0.42,
      description: 'Оптимизации для серверов с большим количеством игроков. Улучшает производительность при одновременной игре сотен игроков.',
      url: 'https://modrinth.com/mod/vmp-fabric',
      icon: 'Very Many Players (Fabric).webp',
      required: true
    },
    {
      id: 'WI-Zoom',
      name: 'WI Zoom',
      size: 0.13,
      description: 'Добавляет функцию приближения (zoom) в игру. Позволяет увеличивать изображение для более детального осмотра удалённых объектов.',
      url: 'https://modrinth.com/mod/wi-zoom',
      icon: 'WI Zoom.webp',
      required: true
    },
    {
      id: 'yosbr',
      name: 'Your Options Shall Be Respected',
      size: 0.02,
      description: 'Сохраняет пользовательские настройки при обновлении модпака. Предотвращает сброс настроек графики, управления и других параметров.',
      url: 'https://modrinth.com/mod/yosbr',
      icon: 'Your Options Shall Be Respected (YOSBR).webp',
      required: true
    },
    {
      id: 'exordium',
      name: 'Exordium',
      size: 0.21,
      description: 'Рендерит GUI с меньшей частотой кадров, освобождая ресурсы для рендеринга мира. Нет смысла рендерить интерфейс на 100+ FPS.',
      url: 'https://modrinth.com/mod/exordium',
      icon: 'Exordium.webp',
      required: true
    },
    // Новые моды
    {
      id: 'betterbeds',
      name: 'BetterBeds',
      size: 0.04,
      description: 'Исправляет рендеринг кроватей, убирая красный экран при сне. Делает переход ко сну более плавным и комфортным для глаз.',
      url: 'https://modrinth.com/mod/better-beds',
      icon: 'Better Beds.webp',
      required: false
    },
    {
      id: 'c2me',
      name: 'Concurrent Chunk Management Engine',
      size: 1.08,
      description: 'Улучшает производительность генерации и загрузки чанков за счет многопоточности. Значительно ускоряет загрузку мира и снижает лаги.',
      url: 'https://modrinth.com/mod/c2me-fabric',
      icon: 'Concurrent Chunk Management Engine (Fabric).webp',
      required: false
    },
    {
      id: 'Capes',
      name: 'Capes',
      size: 0.08,
      description: 'Добавляет поддержку плащей от OptiFine, Labymod и других модов. Позволяет видеть плащи других игроков в многопользовательской игре.',
      url: 'https://modrinth.com/mod/capes',
      icon: 'Capes.webp',
      required: false,
      dependsOn: 'fabric-language-kotlin'
    },
    {
      id: 'cem',
      name: 'Custom Entity Models',
      size: 1.03,
      description: 'Добавляет поддержку пользовательских моделей сущностей из OptiFine. Позволяет использовать ресурс-паки с измененными моделями мобов.',
      url: 'https://modrinth.com/mod/cem',
      icon: 'Custom Entity Models.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'chime',
      name: 'Chime',
      size: 0.04,
      description: 'Добавляет звуковые уведомления для различных событий в игре. Помогает не пропустить важные моменты во время игры.',
      url: 'https://modrinth.com/mod/chime',
      icon: 'Chime.webp',
      required: false
    },
    {
      id: 'CITResewn',
      name: 'CIT Resewn',
      size: 0.37,
      description: 'Добавляет поддержку пользовательских текстур предметов из OptiFine. Позволяет использовать ресурс-паки с уникальными текстурами для предметов.',
      url: 'https://modrinth.com/mod/cit-resewn',
      icon: 'CIT Resewn.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'Clumps',
      name: 'Clumps',
      size: 0.02,
      description: 'Объединяет сферы опыта в группы для повышения производительности. Уменьшает лаги при сборе большого количества опыта.',
      url: 'https://modrinth.com/mod/clumps',
      icon: 'Clumps.webp',
      required: false
    },
    {
      id: 'cullclouds',
      name: 'Cull Clouds',
      size: 0.02,
      description: 'Скрывает облака, которые находятся за другими блоками. Повышает производительность рендеринга неба.',
      url: 'https://modrinth.com/mod/cullclouds',
      icon: 'Cull Clouds.webp',
      required: false
    },
    {
      id: 'Debugify',
      name: 'Debugify',
      size: 0.31,
      description: 'Исправляет множество багов Minecraft, которые есть в официальном трекере багов Mojang. Делает игру более стабильной.',
      url: 'https://modrinth.com/mod/debugify',
      icon: 'Debugify.webp',
      required: false
    },
    {
      id: 'entity_texture_features',
      name: 'Entity Texture Features',
      size: 0.42,
      description: 'Добавляет поддержку продвинутых текстур сущностей из OptiFine. Включает случайные текстуры, биомные текстуры и другие возможности.',
      url: 'https://modrinth.com/mod/entitytexturefeatures',
      icon: '[ETF] Entity Texture Features.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'entity-view-distance',
      name: 'Entity View Distance',
      size: 0.23,
      description: 'Позволяет настроить дальность отображения сущностей отдельно от дальности прорисовки блоков. Помогает оптимизировать производительность.',
      url: 'https://modrinth.com/mod/entity-view-distance',
      icon: 'Entity View Distance.webp',
      required: false
    },
    {
      id: 'fabric-language-kotlin',
      name: 'Fabric Language Kotlin',
      size: 6.02,
      description: 'Добавляет поддержку языка Kotlin для модов Fabric. Является зависимостью для модов, написанных на Kotlin.',
      url: 'https://modrinth.com/mod/fabric-language-kotlin',
      icon: 'Fabric Language Kotlin.webp',
      required: false
    },
    {
      id: 'Entity_Collision_FPS_Fix',
      name: 'Entity Collision FPS Fix',
      size: 0.01,
      description: 'Оптимизирует обработку коллизий сущностей, значительно повышая FPS в местах с большим количеством мобов. Исправляет проблемы производительности при взаимодействии множества сущностей.',
      url: 'https://modrinth.com/mod/entitycollisionfpsfix',
      icon: 'Entity Collision FPS Fix.webp',
      required: false
    },
    {
      id: 'Fastload',
      name: 'FastLoad',
      size: 0.02,
      description: 'Ускоряет загрузку мира, оптимизируя процессы загрузки чанков. Сокращает время ожидания при входе в мир.',
      url: 'https://modrinth.com/mod/fastload',
      icon: 'Fastload.webp',
      required: false
    },
    {
      id: 'fastquit',
      name: 'FastQuit',
      size: 0.07,
      description: 'Позволяет быстро выйти в главное меню без ожидания сохранения мира. Сохранение происходит в фоновом режиме.',
      url: 'https://modrinth.com/mod/fastquit',
      icon: 'FastQuit.webp',
      required: false
    },
    {
      id: 'forgetmechunk',
      name: 'ForgetMeChunk',
      size: 0.02,
      description: 'Автоматически выгружает неиспользуемые чанки из памяти. Помогает снизить потребление оперативной памяти.',
      url: 'https://modrinth.com/mod/forgetmechunk',
      icon: 'ForgetMeChunk.webp',
      required: false
    },
    {
      id: 'iris',
      name: 'Iris Shaders',
      size: 2.68,
      description: 'Добавляет поддержку шейдеров в Minecraft. Совместим с большинством шейдерпаков OptiFine и значительно улучшает визуальное качество игры.',
      url: 'https://modrinth.com/mod/iris',
      icon: 'Iris Shaders.webp',
      required: false,
      dependsOn: 'sodium'
    },
    {
      id: 'krypton',
      name: 'Krypton',
      size: 0.14,
      description: 'Оптимизирует сетевой код Minecraft. Улучшает производительность сервера и снижает задержки в многопользовательской игре.',
      url: 'https://modrinth.com/mod/krypton',
      icon: 'Krypton.webp',
      required: false
    },
    {
      id: 'lambdynamiclights',
      name: 'LambDynamicLights',
      size: 0.53,
      description: 'Добавляет динамическое освещение от предметов в руке, как в OptiFine. Факелы, лава и другие источники света освещают окружающее пространство.',
      url: 'https://modrinth.com/mod/lambdynamiclights',
      icon: 'LambDynamicLights.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'lazydfu',
      name: 'LazyDFU',
      size: 0.01,
      description: 'Оптимизирует DataFixerUpper, ускоряя запуск игры. Особенно заметно улучшение времени загрузки при первом запуске.',
      url: 'https://modrinth.com/mod/lazydfu',
      icon: 'LazyDFU.webp',
      required: false
    },
    {
      id: 'mixintrace',
      name: 'MixinTrace',
      size: 0.03,
      description: 'Улучшает отладочную информацию при крашах, связанных с Mixin. Помогает разработчикам модов диагностировать проблемы.',
      url: 'https://modrinth.com/mod/mixintrace',
      icon: 'MixinTrace.webp',
      required: false
    },
    {
      id: 'modmenu',
      name: 'Mod Menu',
      size: 0.42,
      description: 'Добавляет меню модов в игру. Позволяет просматривать список установленных модов и настраивать их прямо из игры.',
      url: 'https://modrinth.com/mod/modmenu',
      icon: 'Mod Menu.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'smoke-suppression',
      name: 'Smoke Suppression',
      size: 0.07,
      description: 'Позволяет настроить или отключить частицы дыма от костров и других источников. Помогает повысить производительность.',
      url: 'https://modrinth.com/mod/smoke-suppression',
      icon: 'Smoke Suppression.webp',
      required: false
    }
  ];

  const [selectedMods, setSelectedMods] = useState<Set<string>>(
    new Set(mods.filter(mod => mod.required).map(mod => mod.id))
  );

  const handleModToggle = (modId: string) => {
    const mod = mods.find(m => m.id === modId);
    if (!mod || mod.required) return;

    const newSelectedMods = new Set(selectedMods);
    
    if (newSelectedMods.has(modId)) {
      // Убираем мод и все моды, которые от него зависят
      const dependentMods = mods.filter(m => m.dependsOn === modId);
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
  const totalSize = mods.filter(mod => selectedMods.has(mod.id)).reduce((sum, mod) => sum + mod.size, 0);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = () => {
    if (selectedModsCount === 0) return;
    
    // Преобразуем Set в массив ID
    const selectedModIds = Array.from(selectedMods);
    
    // Переходим на страницу загрузки с параметрами
    navigate(`/download-1-19-1?mods=${selectedModIds.join(',')}`);
  };

  const handleSelectAll = () => {
    const allModIds = new Set(mods.map(mod => mod.id));
    setSelectedMods(allModIds);
  };

  const handleDeselectAll = () => {
    const requiredModIds = new Set(mods.filter(mod => mod.required).map(mod => mod.id));
    setSelectedMods(requiredModIds);
  };

  const isModDisabled = (mod: Mod) => {
    if (mod.required) return true;
    if (mod.dependsOn && !selectedMods.has(mod.dependsOn)) return true;
    return false;
  };

  const getModsByCategory = (required: boolean) => {
    return mods.filter(mod => mod.required === required);
  };

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
              <span className={styles.logoText}>OptiSodium 1.19.1</span>
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
              Настройте ваш OptiSodium модпак для Minecraft 1.19.1
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
                        {mod.dependsOn && (
                          <span className={styles.dependencyLabel}>
                            Требует: {mods.find(m => m.id === mod.dependsOn)?.name}
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
              href="https://modrinth.com/mods?f=categories:decoration&g=categories:fabric&v=1.19.1" 
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
              <span className={styles.statText}>Обязательных: <span className={styles.statValue}>{mods.filter(m => m.required).length}</span></span>
            </div>
            
            <div className={styles.statItem}>
              <span className={styles.statText}>Опциональных: <span className={styles.statValue}>{mods.filter(m => !m.required && selectedMods.has(m.id)).length}</span></span>
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

export default PreDownload1191;
