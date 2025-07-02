export interface Mod {
  id: string;
  name: string;
  size: number;
  description: string;
  url: string;
  icon: string;
  required: boolean;
  dependsOn?: string;
  jarFileName?: string; // Имя .jar файла для проверки
}

export interface VersionConfig {
  version: string;
  displayName: string;
  mods: Mod[];
}

// Функция для проверки существования .jar файла
export async function checkModExists(version: string, jarFileName: string): Promise<boolean> {
  try {
    // Преобразуем версию в правильный формат папки
    const folderVersion = version.replace(/\./g, '-');
    const response = await fetch(`/assets/Download${folderVersion}/files/${jarFileName}`, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Все возможные моды с указанием .jar файлов
const ALL_POSSIBLE_MODS: Mod[] = [
  // Обязательные моды
  {
    id: 'cloth-config',
    name: 'Cloth Config API',
    size: 1.11,
    description: 'Библиотека для создания конфигурационных экранов в модах. Предоставляет унифицированный интерфейс для настройки модов с красивым GUI.',
    url: 'https://modrinth.com/mod/cloth-config',
    icon: 'Cloth Config API.webp',
    required: true,
    jarFileName: 'cloth-config.jar'
  },
  {
    id: 'dynamic-fps',
    name: 'Dynamic FPS',
    size: 0.07,
    description: 'Автоматически снижает FPS когда окно Minecraft неактивно или свёрнуто. Помогает сэкономить ресурсы процессора и видеокарты.',
    url: 'https://modrinth.com/mod/dynamic-fps',
    icon: 'Dynamic FPS.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'dynamic-fps.jar'
  },
  {
    id: 'enhancedblockentities',
    name: 'Enhanced Block Entities',
    size: 0.48,
    description: 'Оптимизирует рендеринг блочных сущностей (сундуки, печи и т.д.), заменяя их на более быстрые baked models.',
    url: 'https://modrinth.com/mod/ebe',
    icon: 'Enhanced Block Entities.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'enhancedblockentities.jar'
  },
  {
    id: 'entityculling',
    name: 'EntityCulling',
    size: 0.05,
    description: 'Скрывает рендеринг сущностей, которые находятся за стенами и не видны игроку. Существенно повышает FPS.',
    url: 'https://modrinth.com/mod/entityculling',
    icon: 'Entity Culling.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'entityculling.jar'
  },
  {
    id: 'ferritecore',
    name: 'FerriteCore',
    size: 0.12,
    description: 'Оптимизирует использование памяти, сокращая потребление RAM на 30-40%. Особенно полезен на слабых компьютерах.',
    url: 'https://modrinth.com/mod/ferrite-core',
    icon: 'FerriteCore.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'ferritecore.jar'
  },
  {
    id: 'ImmediatelyFast',
    name: 'ImmediatelyFast',
    size: 0.24,
    description: 'Ускоряет немедленный рендеринг интерфейса и HUD элементов. Оптимизирует отрисовку GUI.',
    url: 'https://modrinth.com/mod/immediatelyfast',
    icon: 'ImmediatelyFast.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'ImmediatelyFast.jar'
  },
  {
    id: 'language-reload',
    name: 'Language Reload',
    size: 0.06,
    description: 'Позволяет перезагружать языковые файлы без перезапуска игры. Полезно для разработчиков ресурс-паков.',
    url: 'https://modrinth.com/mod/language-reload',
    icon: 'Language Reload.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'language-reload.jar'
  },
  {
    id: 'lithium',
    name: 'Lithium',
    size: 0.63,
    description: 'Всесторонняя оптимизация серверной части игры. Улучшает производительность ИИ мобов, физики блоков, генерации мира.',
    url: 'https://modrinth.com/mod/lithium',
    icon: 'Lithium.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'lithium.jar'
  },
  {
    id: 'main-menu-credits',
    name: 'Main Menu Credits',
    size: 0.01,
    description: 'Добавляет информацию о модах и их создателях в главное меню игры.',
    url: 'https://modrinth.com/mod/main-menu-credits',
    icon: 'Main Menu Credits.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'main-menu-credits.jar'
  },
  {
    id: 'moreculling',
    name: 'More Culling',
    size: 0.32,
    description: 'Расширенная система отсечения (culling) для блоков и предметов. Не рендерит невидимые грани блоков.',
    url: 'https://modrinth.com/mod/moreculling',
    icon: 'More Culling.webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'moreculling.jar'
  },
  {
    id: 'fabric-api',
    name: 'Fabric API',
    size: 2.06,
    description: 'Основная библиотека для модов на Fabric. Предоставляет базовые API и хуки для работы модов.',
    url: 'https://modrinth.com/mod/fabric-api',
    icon: 'Fabric API.webp',
    required: true,
    jarFileName: 'fabric-api.jar'
  },
  {
    id: 'reeses_sodium_options',
    name: 'Reese\'s Sodium Options',
    size: 0.05,
    description: 'Альтернативное меню настроек для мода Sodium с улучшенным интерфейсом.',
    url: 'https://modrinth.com/mod/reeses-sodium-options',
    icon: 'Reese\'s Sodium Options.webp',
    required: true,
    dependsOn: 'sodium',
    jarFileName: 'reeses_sodium_options.jar'
  },
  {
    id: 'sodium',
    name: 'Sodium',
    size: 0.70,
    description: 'Мощная оптимизация рендеринга, значительно повышающая FPS. Полностью переписывает систему отрисовки мира.',
    url: 'https://modrinth.com/mod/sodium',
    icon: 'Sodium.webp',
    required: true,
    jarFileName: 'sodium.jar'
  },
  {
    id: 'sodium-extra',
    name: 'Sodium Extra',
    size: 0.33,
    description: 'Дополнительные настройки для мода Sodium. Добавляет больше опций оптимизации.',
    url: 'https://modrinth.com/mod/sodium-extra',
    icon: 'Sodium Extra.webp',
    required: true,
    dependsOn: 'sodium',
    jarFileName: 'sodium-extra.jar'
  },
  {
    id: 'starlight',
    name: 'Starlight',
    size: 0.12,
    description: 'Полностью переписанный движок освещения для максимальной производительности.',
    url: 'https://modrinth.com/mod/starlight',
    icon: 'Starlight (Fabric).webp',
    required: true,
    jarFileName: 'starlight.jar'
  },
  {
    id: 'vmp',
    name: 'Very Many Players',
    size: 0.47,
    description: 'Оптимизации для серверов с большим количеством игроков.',
    url: 'https://modrinth.com/mod/vmp-fabric',
    icon: 'Very Many Players (Fabric).webp',
    required: true,
    jarFileName: 'vmp.jar'
  },
  {
    id: 'WI-Zoom',
    name: 'WI Zoom',
    size: 0.13,
    description: 'Добавляет функцию приближения (zoom) в игру.',
    url: 'https://modrinth.com/mod/wi-zoom',
    icon: 'WI Zoom.webp',
    required: true,
    jarFileName: 'WI-Zoom.jar'
  },
  {
    id: 'yosbr',
    name: 'Your Options Shall Be Respected',
    size: 0.02,
    description: 'Сохраняет пользовательские настройки при обновлении модпака. Предотвращает сброс настроек графики, управления и других параметров.',
    url: 'https://modrinth.com/mod/yosbr',
    icon: 'Your Options Shall Be Respected (YOSBR).webp',
    required: true,
    dependsOn: 'fabric-api',
    jarFileName: 'yosbr.jar'
  },
  // Опциональные моды
  {
    id: 'animatica',
    name: 'Animatica',
    size: 0.07,
    description: 'Добавляет поддержку анимированных текстур из OptiFine. Позволяет использовать ресурс-паки с анимированными блоками, предметами и другими элементами игры.',
    url: 'https://modrinth.com/mod/animatica',
    icon: 'Animatica.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'animatica.jar'
  },
  {
    id: 'betterbed',
    name: 'BetterBeds',
    size: 0.05,
    description: 'Исправляет рендеринг кроватей, убирая красный экран при сне. Делает переход ко сну более плавным и комфортным для глаз.',
    url: 'https://modrinth.com/mod/better-beds',
    icon: 'Better Beds.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'betterbeds.jar'
  },
  {
    id: 'capes',
    name: 'Capes',
    size: 0.16,
    description: 'Добавляет поддержку плащей от OptiFine, Labymod и других модов. Позволяет видеть плащи других игроков в многопользовательской игре.',
    url: 'https://modrinth.com/mod/capes',
    icon: 'Capes.webp',
    required: false,
    dependsOn: 'fabric-language-kotlin',
    jarFileName: 'capes.jar'
  },
  {
    id: 'cem',
    name: 'Custom Entity Models',
    size: 0.83,
    description: 'Поддержка пользовательских моделей мобов в стиле OptiFine.',
    url: 'https://modrinth.com/mod/cem',
    icon: 'Custom Entity Models.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'customentitymodels.jar'
  },
  {
    id: 'cit-resewn',
    name: 'CIT Resewn',
    size: 0.39,
    description: 'Добавляет поддержку пользовательских текстур предметов из OptiFine. Позволяет использовать ресурс-паки с уникальными текстурами для предметов.',
    url: 'https://modrinth.com/mod/cit-resewn',
    icon: 'CIT Resewn.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'CITResewn.jar'
  },
  {
    id: 'clumps',
    name: 'Clumps',
    size: 0.02,
    description: 'Объединяет сферы опыта в группы для повышения производительности. Уменьшает лаги при сборе большого количества опыта.',
    url: 'https://modrinth.com/mod/clumps',
    icon: 'Clumps.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'Clumps.jar'
  },
  {
    id: 'cullclouds',
    name: 'Cull Clouds',
    size: 0.01,
    description: 'Не рендерит облака, скрытые за другими блоками.',
    url: 'https://modrinth.com/mod/cull-clouds',
    icon: 'Cull Clouds.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'cullclouds.jar'
  },
  {
    id: 'debugify',
    name: 'Debugify',
    size: 0.32,
    description: 'Исправляет множество багов Minecraft, которые есть в официальном трекере багов Mojang. Делает игру более стабильной.',
    url: 'https://modrinth.com/mod/debugify',
    icon: 'Debugify.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'Debugify.jar'
  },
  {
    id: 'entity-collision-fps-fix',
    name: 'Entity Collision FPS Fix',
    size: 0.01,
    description: 'Оптимизирует проверку столкновений сущностей.',
    url: 'https://modrinth.com/mod/entitycollisionfpsfix',
    icon: 'Entity Collision FPS Fix.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'entitycollisionfpsfix.jar'
  },
  {
    id: 'exordium',
    name: 'Exordium',
    size: 0.07,
    description: 'Рендерит GUI реже для повышения производительности.',
    url: 'https://modrinth.com/mod/exordium',
    icon: 'Exordium.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'exordium.jar'
  },
  {
    id: 'iris',
    name: 'Iris Shaders',
    size: 2.38,
    description: 'Добавляет поддержку шейдеров в Minecraft. Совместим с большинством шейдерпаков OptiFine и значительно улучшает визуальное качество игры.',
    url: 'https://modrinth.com/mod/iris',
    icon: 'Iris Shaders.webp',
    required: false,
    dependsOn: 'sodium',
    jarFileName: 'iris.jar'
  },
  {
    id: 'krypton',
    name: 'Krypton',
    size: 0.18,
    description: 'Оптимизирует сетевой код Minecraft. Улучшает производительность сервера и снижает задержки в многопользовательской игре.',
    url: 'https://modrinth.com/mod/krypton',
    icon: 'Krypton.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'krypton.jar'
  },
  {
    id: 'lambdynamiclights',
    name: 'LambDynamicLights',
    size: 0.55,
    description: 'Добавляет динамическое освещение от предметов в руке, как в OptiFine. Факелы, лава и другие источники света освещают окружающее пространство.',
    url: 'https://modrinth.com/mod/lambdynamiclights',
    icon: 'LambDynamicLights.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'lambdynamiclights.jar'
  },
  {
    id: 'lazydfu',
    name: 'LazyDFU',
    size: 0.01,
    description: 'Оптимизирует DataFixerUpper, ускоряя запуск игры. Особенно заметно улучшение времени загрузки при первом запуске.',
    url: 'https://modrinth.com/mod/lazydfu',
    icon: 'LazyDFU.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'lazydfu.jar'
  },
  {
    id: 'memoryleakfix',
    name: 'Memory Leak Fix',
    size: 0.02,
    description: 'Исправляет утечки памяти в клиенте.',
    url: 'https://modrinth.com/mod/memoryleakfix',
    icon: 'Memory Leak Fix.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'memoryleakfix.jar'
  },
  {
    id: 'mixintrace',
    name: 'MixinTrace',
    size: 0.03,
    description: 'Улучшает отладочную информацию при крашах, связанных с Mixin. Помогает разработчикам модов диагностировать проблемы.',
    url: 'https://modrinth.com/mod/mixintrace',
    icon: 'MixinTrace.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'mixintrace.jar'
  },
  {
    id: 'mod-menu',
    name: 'Mod Menu',
    size: 0.70,
    description: 'Добавляет меню модов в игру. Позволяет просматривать список установленных модов и настраивать их прямо из игры.',
    url: 'https://modrinth.com/mod/modmenu',
    icon: 'Mod Menu.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'modmenu.jar'
  },
  {
    id: 'fabrishot',
    name: 'Fabrishot',
    size: 0.02,
    description: 'Позволяет делать скриншоты в высоком разрешении.',
    url: 'https://modrinth.com/mod/fabrishot',
    icon: 'Fabrishot.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'fabrishot.jar'
  },
  {
    id: 'smoke-suppression',
    name: 'Smoke Suppression',
    size: 0.07,
    description: 'Позволяет настроить или отключить частицы дыма от костров и других источников. Помогает повысить производительность.',
    url: 'https://modrinth.com/mod/smoke-suppression',
    icon: 'Smoke Suppression.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'smoke-suppression.jar'
  },
  // Специфичные моды
  {
    id: 'chime',
    name: 'Chime',
    size: 0.11,
    description: 'Добавляет приятные звуковые уведомления для различных событий в игре.',
    url: 'https://modrinth.com/mod/chime',
    icon: 'Chime.webp',
    required: false,
    jarFileName: 'chime.jar'
  },
  {
    id: 'c2me',
    name: 'Concurrent Chunk Management Engine',
    size: 1.26,
    description: 'Улучшает производительность генерации и загрузки чанков за счет многопоточности. Значительно ускоряет загрузку мира и снижает лаги.',
    url: 'https://modrinth.com/mod/c2me-fabric',
    icon: 'Concurrent Chunk Management Engine (Fabric).webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'c2me.jar'
  },
  {
    id: 'entity-view-distance',
    name: 'Entity View Distance',
    size: 0.24,
    description: 'Позволяет настроить дальность отображения сущностей отдельно от дальности прорисовки блоков. Помогает оптимизировать производительность.',
    url: 'https://modrinth.com/mod/entity-view-distance',
    icon: 'Entity View Distance.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'entity-view-distance.jar'
  },
  {
    id: 'fabric-language-kotlin',
    name: 'Fabric Language Kotlin',
    size: 6.47,
    description: 'Добавляет поддержку языка Kotlin для модов Fabric. Является зависимостью для модов, написанных на Kotlin.',
    url: 'https://modrinth.com/mod/fabric-language-kotlin',
    icon: 'Fabric Language Kotlin.webp',
    required: false,
    jarFileName: 'fabric-language-kotlin.jar'
  },
  {
    id: 'fabricskyboxes',
    name: 'FabricSkyBoxes',
    size: 0.18,
    description: 'Добавляет поддержку пользовательских скайбоксов из ресурс-паков. Позволяет изменять вид неба и создавать атмосферные эффекты.',
    url: 'https://modrinth.com/mod/fabricskyboxes',
    icon: 'fabricskyboxes.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'fabricskyboxes.jar'
  },
  {
    id: 'fabricskyboxes-interop',
    name: 'FabricSkyboxes Interop',
    size: 0.04,
    description: 'Интеграция FabricSkyboxes с другими модами.',
    url: 'https://modrinth.com/mod/fabricskyboxes-interop',
    icon: 'FabricSkyboxes Interop.webp',
    required: false,
    dependsOn: 'fabricskyboxes',
    jarFileName: 'fsb-interop.jar'
  },
  {
    id: 'fastload',
    name: 'FastLoad',
    size: 0.55,
    description: 'Ускоряет загрузку мира, оптимизируя процессы загрузки чанков. Сокращает время ожидания при входе в мир.',
    url: 'https://modrinth.com/mod/fastload',
    icon: 'Fastload.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'Fastload.jar'
  },
  {
    id: 'fastquit',
    name: 'FastQuit',
    size: 0.07,
    description: 'Позволяет быстро выйти в главное меню без ожидания сохранения мира. Сохранение происходит в фоновом режиме.',
    url: 'https://modrinth.com/mod/fastquit',
    icon: 'FastQuit.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'fastquit.jar'
  },
  {
    id: 'forgetmechunk',
    name: 'ForgetMeChunk',
    size: 0.01,
    description: 'Предотвращает накопление чанков в памяти.',
    url: 'https://modrinth.com/mod/forgetmechunk',
    icon: 'ForgetMeChunk.webp',
    required: false,
    jarFileName: 'forgetmechunk.jar'
  },
  {
    id: 'bedrodium',
    name: 'Bedrodium',
    size: 0.05,
    description: 'Оптимизации для бедрока.',
    url: 'https://modrinth.com/mod/bedrodium',
    icon: 'Bedrodium.png',
    required: false,
    jarFileName: 'bedrodium.jar'
  },
  {
    id: 'emf',
    name: 'Entity Model Features',
    size: 0.45,
    description: 'Поддержка пользовательских моделей сущностей.',
    url: 'https://modrinth.com/mod/entity-model-features',
    icon: '[EMF] Entity Model Features.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'entity_model_features.jar'
  },
  {
    id: 'etf',
    name: 'Entity Texture Features',
    size: 0.43,
    description: 'Поддержка пользовательских текстур сущностей.',
    url: 'https://modrinth.com/mod/entitytexturefeatures',
    icon: '[ETF] Entity Texture Features.webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'entity_texture_features.jar'
  },
  {
    id: 'noxesium',
    name: 'Noxesium',
    size: 0.32,
    description: 'Дополнительные оптимизации и исправления.',
    url: 'https://modrinth.com/mod/noxesium',
    icon: 'Noxesium.webp',
    required: false,
    jarFileName: 'noxesium.jar'
  },
  // Новые моды из mods.txt, которых не было в оригинальном списке
  {
    id: 'smoothboot',
    name: 'Smooth Boot (Fabric)',
    size: 0.08,
    description: 'Оптимизирует загрузку игры, распределяя нагрузку между CPU ядрами. Уменьшает время запуска.',
    url: 'https://modrinth.com/mod/smoothboot-fabric',
    icon: 'Smooth Boot (Fabric).webp',
    required: false,
    dependsOn: 'fabric-api',
    jarFileName: 'smoothboot.jar'
  }
];

// Конфигурация версий (порядок определяет приоритет - первая версия считается рекомендуемой)
const VERSION_CONFIGS: Record<string, Omit<VersionConfig, 'mods'>> = {
  '1.20': {
    version: '1.20',
    displayName: 'Minecraft 1.20'
  },
  '1.19.4': {
    version: '1.19.4',
    displayName: 'Minecraft 1.19.4'
  },
  '1.19.3': {
    version: '1.19.3',
    displayName: 'Minecraft 1.19.3'
  },
  '1.19.2': {
    version: '1.19.2',
    displayName: 'Minecraft 1.19.2'
  },
  '1.19.1': {
    version: '1.19.1', 
    displayName: 'Minecraft 1.19.1'
  },
  '1.19': {
    version: '1.19',
    displayName: 'Minecraft 1.19'
  }
};

// Функция для получения модов для конкретной версии (динамическая фильтрация)
export async function getModsForVersion(version: string): Promise<Mod[]> {
  console.log(`getModsForVersion вызвана для версии: ${version}`);
  
  try {
    // Проверяем каждый мод на наличие в файловой системе
    const modPromises = ALL_POSSIBLE_MODS.map(async (mod) => {
      if (mod.jarFileName) {
        try {
          const exists = await checkModExists(version, mod.jarFileName);
          return exists ? mod : null;
        } catch (error) {
          // При ошибке проверки файла НЕ добавляем мод
          console.warn(`Не удалось проверить мод ${mod.name} для версии ${version}:`, error);
          return null;
        }
      }
      return null;
    });
    
    const results = await Promise.all(modPromises);
    const filteredMods = results.filter(mod => mod !== null) as Mod[];
    
    console.log(`Найдено ${filteredMods.length} модов для версии ${version}`);
    
    // Если не найдено ни одного мода, это может быть ошибка сети
    // В этом случае возвращаем все моды как fallback
    if (filteredMods.length === 0) {
      console.warn(`Не найдено модов для версии ${version}, используем fallback`);
      return ALL_POSSIBLE_MODS;
    }
    
    return filteredMods;
  } catch (error) {
    console.warn('Ошибка при динамической фильтрации модов, используем fallback:', error);
    // В случае ошибки возвращаем все моды
    return ALL_POSSIBLE_MODS;
  }
}

// Синхронная версия для немедленного использования (без проверки файлов)
export function getModsForVersionSync(_version: string): Mod[] {
  // Возвращаем все моды без проверки наличия файлов
  // Для использования в случаях, когда нужна синхронная работа
  return ALL_POSSIBLE_MODS;
}

// Генерируем базовую конфигурацию для всех версий (без проверки файлов)
export const MODS_CONFIG: Record<string, VersionConfig> = {};

Object.keys(VERSION_CONFIGS).forEach(version => {
  const config = VERSION_CONFIGS[version];
  MODS_CONFIG[version] = {
    ...config,
    mods: ALL_POSSIBLE_MODS // Базовая конфигурация, реальная фильтрация через getModsForVersion
  };
});

// Экспорт для обратной совместимости
export const getVersionConfig = (version: string): VersionConfig | undefined => {
  return MODS_CONFIG[version];
};

export const getSupportedVersions = (): string[] => {
  return Object.keys(VERSION_CONFIGS);
};
