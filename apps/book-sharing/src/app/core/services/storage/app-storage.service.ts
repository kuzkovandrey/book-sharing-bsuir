import { Observable } from 'rxjs';
import { StorageKeys } from '../../values';

export abstract class AppStorageService {
  abstract set<T>(key: StorageKeys, value: T): void;

  abstract get<T>(key: StorageKeys): T | null;

  abstract remove(key: StorageKeys): void;

  abstract clear(): void;
}
