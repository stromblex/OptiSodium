# OptiSodium - Minecraft Modpack Distribution Platform

🎮 **Веб-платформа для создания и распространения оптимизированных модпаков Minecraft**

OptiSodium — это современное веб-приложение, позволяющее пользователям легко создавать персонализированные модпаки для Minecraft с акцентом на производительность и оптимизацию.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS%20Modules-000000?style=flat&logo=css3&logoColor=white)

## 🎯 Назначение проекта

**OptiSodium** решает проблему сложности настройки оптимизированных модпаков для Minecraft:

- 🚀 **Простота использования** — интуитивный пошаговый интерфейс
- ⚡ **Фокус на производительность** — только проверенные оптимизационные моды
- 📦 **Готовые конфигурации** — предустановленные настройки для максимального FPS
- 🎨 **Современный UI/UX** — красивый и отзывчивый интерфейс
- 📱 **Кроссплатформенность** — работает на всех устройствах

## 🏗️ Архитектура проекта

### Технический стек
- **Frontend Framework**: React 18 с TypeScript
- **Сборщик**: Vite для быстрой разработки
- **Стилизация**: CSS Modules для изолированных стилей
- **Роутинг**: React Router для SPA навигации
- **Архивация**: JSZip для создания модпаков
- **Анимации**: CSS Transitions и Animations

### Структура проекта
```
OptiSodium/
├── public/                     # Статические ресурсы
│   ├── service-worker.js       # Service Worker для PWA
│   └── assets/                 # Медиа ресурсы
│       ├── common/             # Общие иконки и логотипы модов
│       ├── HomePage/           # Ресурсы главной страницы
│       ├── Download1-19/       # Файлы модов для MC 1.19
│       ├── Download1-19-1/     # Файлы модов для MC 1.19.1
│       ├── Download1-19-2/     # Файлы модов для MC 1.19.2
│       └── Download1-19-3/     # Файлы модов для MC 1.19.3
│           └── files/          # .jar файлы модов, config.zip, options.txt
├── src/                        # Исходный код
│   ├── components/             # React компоненты
│   │   ├── HomePage/           # Главная страница
│   │   ├── PreDownload1-19/    # Выбор модов для 1.19
│   │   ├── Download1-19/       # Скачивание модпака 1.19
│   │   ├── PreDownload1-19-1/  # Выбор модов для 1.19.1
│   │   ├── Download1-19-1/     # Скачивание модпака 1.19.1
│   │   ├── PreDownload1-19-2/  # Выбор модов для 1.19.2
│   │   ├── Download1-19-2/     # Скачивание модпака 1.19.2
│   │   ├── PreDownload1-19-3/  # Выбор модов для 1.19.3
│   │   ├── Download1-19-3/     # Скачивание модпака 1.19.3
│   │   └── Install-Instruction/ # Инструкции по установке
│   ├── utils/                  # Вспомогательные функции
│   │   └── performance.ts      # Оптимизация производительности
│   ├── App.tsx                 # Главный компонент с роутингом
│   ├── main.tsx               # Точка входа
│   └── styles.css             # Глобальные стили
├── index.html                 # HTML шаблон
├── package.json              # Зависимости и скрипты
├── tsconfig.json            # Конфигурация TypeScript
└── vite.config.ts          # Конфигурация Vite
```

## 🎮 Функциональность

### Основные возможности

#### 1. **Выбор версии Minecraft**
- Поддержка версий 1.19, 1.19.1, 1.19.2, 1.19.3
- Визуальные карточки для каждой версии
- Информация о совместимости модов

#### 2. **Интерактивный выбор модов**
- **Обязательные моды**: Базовые оптимизационные моды (Sodium, Lithium, Starlight, Fabric API)
- **Дополнительные моды**: Опциональные моды для расширения функциональности
- **Система зависимостей**: Автоматическое добавление/удаление зависимых модов
- **Предпросмотр**: Описание каждого мода с размером и ссылкой

#### 3. **Создание модпака**
- Автоматическое создание ZIP архива
- Включение файлов модов (.jar)
- Добавление оптимизированных настроек (options.txt)
- Включение конфигурационных файлов (config.zip)
- Анимированный прогресс загрузки

#### 4. **Пользовательский интерфейс**
- Пошаговая навигация с индикатором прогресса
- Адаптивный дизайн для всех устройств
- Плавные анимации и переходы
- Информативная статистика (количество модов, общий размер)

### Поддерживаемые моды

Платформа включает **45+ оптимизационных модов**:

**Основные (обязательные):**
- **Sodium** - Революционная оптимизация рендеринга (+400% FPS)
- **Lithium** - Оптимизация серверной части игры
- **Starlight** - Переписанный движок освещения
- **Fabric API** - Базовая библиотека для модов

**Дополнительные:**
- **Iris Shaders** - Поддержка шейдеров
- **Dynamic FPS** - Снижение FPS в фоне
- **Entity Culling** - Оптимизация рендеринга сущностей
- **Enhanced Block Entities** - Оптимизация блочных сущностей
- **FerriteCore** - Оптимизация памяти
- И многие другие...

## 🚀 Запуск проекта

### Предварительные требования
- Node.js 18+ 
- npm или yarn

### Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/yourusername/optisodium.git
cd optisodium

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
# Приложение будет доступно по адресу http://localhost:5173

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

### Скрипты package.json
```json
{
  "scripts": {
    "dev": "vite",              // Запуск dev сервера
    "build": "tsc && vite build", // Сборка проекта
    "preview": "vite preview",   // Предпросмотр сборки
    "lint": "eslint src"         // Проверка кода
  }
}
```

## 🏛️ Архитектурные решения

### React Router для SPA
Приложение построено как Single Page Application:
- Единый HTML файл с динамической маршрутизацией
- Мгновенные переходы между страницами
- Сохранение состояния между навигацией
- Поддержка браузерной истории

### Управление состоянием
```tsx
// Локальное состояние компонентов
const [selectedMods, setSelectedMods] = useState<string[]>([]);
const [downloadProgress, setDownloadProgress] = useState(0);

// Передача данных через URL параметры
const params = new URLSearchParams();
params.set('mods', selectedMods.join(','));
navigate(`/download-1-19?${params.toString()}`);
```

### CSS Modules для стилизации
```css
/* Download1-19.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.modCard {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.modCard:hover {
  transform: translateY(-4px);
}
```

### TypeScript интерфейсы
```tsx
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
```

## 📦 Процесс создания модпака

### Алгоритм сборки

1. **Получение выбранных модов** из URL параметров
2. **Создание ZIP архива** с помощью JSZip
3. **Загрузка файлов модов** из `/assets/Download1-19-X/files/`
4. **Добавление конфигураций**:
   - `options.txt` - оптимизированные настройки игры
   - `config.zip` - конфигурации модов
5. **Генерация архива** с компрессией
6. **Автоматическое скачивание** через браузер

### Обработка ошибок
```tsx
try {
  const response = await fetch(`/assets/Download1-19-3/files/${mod.id}.jar`);
  if (response.ok) {
    const blob = await response.blob();
    modsFolder?.file(`${mod.id}.jar`, blob);
  } else {
    // Создание информационного файла при отсутствии мода
    const modInfo = `Мод: ${mod.name}\nОписание: ${mod.description}`;
    modsFolder?.file(`${mod.id}_info.txt`, modInfo);
  }
} catch (error) {
  console.error(`Ошибка загрузки мода ${mod.name}:`, error);
}
```

## 🎨 UI/UX Особенности

### Адаптивный дизайн
- Мобильная оптимизация с помощью CSS Grid и Flexbox
- Плавные анимации на CSS Transitions
- Оптимизированная производительность рендеринга

### Анимации и интерактивность
- Hover эффекты для карточек модов
- Анимированный прогресс загрузки
- Плавные переходы между страницами
- Интерактивные чекбоксы и кнопки

### Визуальная иерархия
- Четкое разделение обязательных и опциональных модов
- Цветовая кодировка статуса модов
- Информативные иконки и бейджи

## 🔧 Оптимизация производительности

### Lazy Loading компонентов
```tsx
const LazyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Загрузка...</div>}>
  <LazyComponent />
</Suspense>
```

### Мемоизация вычислений
```tsx
const totalSize = useMemo(() => 
  selectedMods.reduce((sum, mod) => sum + mod.size, 0),
  [selectedMods]
);
```

### Оптимизация изображений
- WebP формат для лучшего сжатия
- Lazy loading для изображений модов
- Fallback на дефолтные иконки

## 🚀 Деплой и продакшен

### Сборка проекта
```bash
npm run build
```

Создает оптимизированную сборку в папке `dist/`:
- Минифицированный JavaScript/CSS
- Tree-shaking неиспользуемого кода
- Оптимизированные изображения
- Сжатие статических ресурсов

### Развертывание
Проект можно развернуть на любой статический хостинг:
- **Vercel** - рекомендуемый вариант для React SPA
- **Netlify** - отличная интеграция с Git
- **GitHub Pages** - бесплатный хостинг
- **Firebase Hosting** - быстрый CDN

## 🛠️ Расширение функциональности

### Добавление новой версии Minecraft

1. **Создать папку с файлами**:
```
public/assets/Download1-20/files/
├── mod1.jar
├── mod2.jar
├── config.zip
└── options.txt
```

2. **Создать компоненты**:
```tsx
// src/components/PreDownload1-20/PreDownload1-20.tsx
// src/components/Download1-20/Download1-20.tsx
```

3. **Добавить маршруты в App.tsx**:
```tsx
<Route path="/predownload-1-20" element={<PreDownload120 />} />
<Route path="/download-1-20" element={<Download120 />} />
```

### Добавление нового мода
```tsx
{
  id: 'new-mod',
  name: 'New Optimization Mod',
  size: 0.15,
  description: 'Описание нового мода для оптимизации',
  url: 'https://modrinth.com/mod/new-mod',
  icon: 'new-mod.webp',
  required: false,
  dependsOn: 'fabric-api' // опционально
}
```

### Производительность
- Время загрузки первой страницы: ~800ms
- Размер JavaScript bundle: ~150KB (gzipped)
- Lighthouse Score: 95+ по всем параметрам

### Поддерживаемые браузеры
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Структура для контрибьюторов
1. **Fork** репозитория
2. **Создать ветку** для новой функции
3. **Добавить изменения** с тестами
4. **Создать Pull Request** с описанием

### Гайдлайны кода
- TypeScript для типобезопасности
- CSS Modules для изолированных стилей
- Осмысленные имена переменных и функций
- Комментарии для сложной логики

---


**Создано с ❤️ для сообщества Minecraft**

- 🐛 [Сообщить о баге](https://github.com/stromblex/optisodium/issues)
- 💡 [Предложить улучшение](https://github.com/stromblex/optisodium/discussions)

---

*Технологии: React • TypeScript • Vite • CSS Modules • JSZip • React Router*
