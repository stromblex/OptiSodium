import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from 'jszip';
import styles from './Download1-19-4.module.css';

interface Mod {
  id: string;
  name: string;
  size: number;
  description: string;
  url: string;
  icon: string;
  required: boolean;
  dependsOn?: string;
}

const Download1194 = () => {
  const navigate = useNavigate();
  const [selectedMods, setSelectedMods] = useState<Mod[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);

  // Все доступные моды (полный массив из PreDownload1-19-4)
  const allMods: Mod[] = [
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
      id: 'seaborgium',
      name: 'Seaborgium',
      size: 0.03,
      description: 'Небольшой мод для оптимизации рендеринга в Minecraft, повышающий производительность стандартного интерфейса (HUD).',
      url: 'https://modrinth.com/mod/seaborgium',
      icon: 'Seaborgium.webp',
      required: true,
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
      id: 'animatica',
      name: 'Animatica',
      size: 0.07,
      description: 'Добавляет поддержку анимированных текстур из OptiFine. Позволяет использовать ресурс-паки с анимированными блоками, предметами и другими элементами игры.',
      url: 'https://modrinth.com/mod/animatica',
      icon: 'Animatica.webp',
      required: false
    },
    {
      id: 'bedrodium',
      name: 'Bedrodium',
      size: 0.02,
      description: 'Оптимизирует слой бедрока, удаляя невидимые грани. Улучшает производительность для игроков с слабым железом.',
      url: 'https://modrinth.com/mod/bedrodium',
      icon: 'Bedrodium.png',
      required: false,
      dependsOn: 'sodium'
    },
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
    },
    {
      id: 'entity_model_features',
      name: '[EMF] Entity Model Features',
      size: 0.75,
      description: 'Позволяет ресурс-пакам изменять модели сущностей используя OptiFine формат. Совместим с Custom Entity Models.',
      url: 'https://modrinth.com/mod/entity-model-features',
      icon: '[EMF] Entity Model Features.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'fabricskyboxes',
      name: 'FabricSkyboxes',
      size: 0.04,
      description: 'Добавляет поддержку пользовательских скайбоксов из ресурс-паков. Позволяет изменять вид неба и создавать атмосферные эффекты.',
      url: 'https://modrinth.com/mod/fabricskyboxes',
      icon: 'fabricskyboxes.webp',
      required: false,
      dependsOn: 'fabric-api'
    },
    {
      id: 'fsb-interop',
      name: 'FabricSkyboxes Interop',
      size: 0.01,
      description: 'Обеспечивает совместимость FabricSkyboxes с другими модами. Улучшает интеграцию пользовательских скайбоксов.',
      url: 'https://modrinth.com/mod/fabricskyboxes-interop',
      icon: 'FabricSkyboxes Interop.webp',
      required: false,
      dependsOn: 'fabricskyboxes'
    },
    {
      id: 'noxesium',
      name: 'Noxesium',
      size: 0.12,
      description: 'Клиентский мод для серверов Noxcrew, добавляющий расширенные возможности и оптимизации для специализированных серверов.',
      url: 'https://modrinth.com/mod/noxesium',
      icon: 'Noxesium.webp',
      required: false,
      dependsOn: 'fabric-api'
    }
  ];

  useEffect(() => {
    // Получаем выбранные моды из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const modsParam = urlParams.get('mods');
    
    if (modsParam) {
      const modIds = modsParam.split(',');
      console.log('Received mod IDs:', modIds);
      console.log('Total mod IDs count:', modIds.length);
      
      const filteredMods = allMods.filter(mod => modIds.includes(mod.id));
      console.log('Found mods:', filteredMods.map(m => m.name));
      console.log('Found mods count:', filteredMods.length);
      
      setSelectedMods(filteredMods);
    }
  }, []);

  const totalSize = selectedMods.reduce((sum, mod) => sum + mod.size, 0);

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const zip = new JSZip();
      const modsFolder = zip.folder("mods");
      
      // Симуляция прогресса загрузки
      let progress = 0;
      const totalItems = selectedMods.length + 2; // +2 для config.zip и options.txt
      let currentItem = 0;
      
      // Загружаем моды
      for (let i = 0; i < selectedMods.length; i++) {
        const mod = selectedMods[i];
        
        try {
          // Пытаемся загрузить файл мода из папки assets/Download1-19-2/files
          const response = await fetch(`/assets/Download1-19-4/files/${mod.id}.jar`);
          
          if (response.ok) {
            const blob = await response.blob();
            modsFolder?.file(`${mod.id}.jar`, blob);
            console.log(`✅ Успешно загружен файл ${mod.id}.jar`);
          } else {
            console.warn(`❌ Файл ${mod.id}.jar не найден (${response.status}), создаем информационный файл`);
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
        const optionsResponse = await fetch('/assets/Download1-19-4/files/options.txt');
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
        const configZipResponse = await fetch('/assets/Download1-19-4/files/config.zip');
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
      link.download = 'optisodium1-19-4.zip';
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
              <span className={styles.logoText}>OptiSodium 1.19.4</span>
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
                  Выбрано {selectedMods.length} модов для Minecraft Java Edition 1.19.4
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

export default Download1194;
