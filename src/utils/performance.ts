/**
 * Утилиты для мониторинга и оптимизации производительности
 */

// Дебаунс функция для оптимизации частых вызовов
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle функция для ограничения частоты вызовов
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Мониторинг производительности рендеринга
export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;

  public getFPS(): number {
    return this.fps;
  }

  public updateFPS(): void {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  public getMemoryUsage(): { used: number; total: number; percentage: number } | null {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        percentage: Math.round((memory.usedJSHeapSize / memory.totalJSHeapSize) * 100)
      };
    }
    return null;
  }
}

// Lazy loading для изображений
export function createIntersectionObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
}

// Оптимизация для больших списков
export function virtualizeList<T>(
  items: T[],
  containerHeight: number,
  itemHeight: number,
  scrollTop: number
): { visibleItems: T[]; startIndex: number; endIndex: number } {
  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  
  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex
  };
}

// Измерение времени выполнения функций
export function measurePerformance<T extends (...args: any[]) => any>(
  func: T,
  label?: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    const result = func(...args);
    const endTime = performance.now();
    
    console.log(`${label || func.name} execution time: ${endTime - startTime}ms`);
    return result;
  };
}

// Проверка поддержки WebP
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Предзагрузка критических ресурсов
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Создание производительного setState для больших объектов
export function createOptimizedState<T extends Record<string, any>>(
  initialState: T
): {
  state: T;
  setState: (updates: Partial<T>) => void;
  getState: () => T;
} {
  let state = { ...initialState };
  
  return {
    get state() {
      return state;
    },
    setState: (updates: Partial<T>) => {
      state = { ...state, ...updates };
    },
    getState: () => state
  };
}