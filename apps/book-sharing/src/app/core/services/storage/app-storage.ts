import { AppStorageService } from './app-storage.service';
import { StorageKeys } from '../../values';

export class AppStorage implements AppStorageService {
  constructor(private storage: Storage) {}

  set<T>(key: StorageKeys, value: T) {
    this.storage.setItem(key as unknown as string, JSON.stringify(value));
  }

  get<T>(key: StorageKeys): T | null {
    try {
      const item = this.storage.getItem(key as unknown as string);

      if (!item) return null;

      return JSON.parse(item);
    } catch {
      return null;
    }
  }

  remove(key: StorageKeys) {
    this.storage.removeItem(key as unknown as string);
  }

  clear() {
    this.storage.clear();
  }
}
