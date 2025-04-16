export const localStorageUtil = {
  set<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (err) {
      console.error(`Error saving "${key}" to localStorage:`, err);
    }
  },

  get<T>(key: string): T | null {
    try {
      const json = localStorage.getItem(key);
      if (!json) return null;
      return JSON.parse(json) as T;
    } catch (err) {
      console.error(`Error reading "${key}" from localStorage:`, err);
      return null;
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },
};
