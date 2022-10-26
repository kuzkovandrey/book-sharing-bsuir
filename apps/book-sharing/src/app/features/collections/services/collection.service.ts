import { AppStorageService } from '@core/services/storage';
import { Injectable } from '@angular/core';
import { StorageKeys } from '@core/values';
import { Model } from '@book-sharing/api-interfaces';

export type ModelWithCollectionState<T> = T & {
  inCollection: boolean;
};

@Injectable({ providedIn: 'root' })
export class CollectionService {
  private get collection(): number[] {
    return (
      this.appStorageService.get<number[]>(StorageKeys.BOOK_OFFER_COLLECTION) ??
      []
    );
  }

  private set collection(collection: number[]) {
    this.appStorageService.set<number[]>(
      StorageKeys.BOOK_OFFER_COLLECTION,
      collection
    );
  }

  constructor(private appStorageService: AppStorageService) {}

  getCollectionList(): number[] {
    return this.collection;
  }

  inCollection(id: number): boolean {
    const collection = this.collection;

    return !!collection.find((itemId) => itemId === id);
  }

  addToCollection(id: number) {
    const collection = this.collection;
    collection.push(id);
    this.collection = collection;
  }

  removeFromCollection(id: number) {
    const collection = this.collection;
    const newCollection = collection.filter((itemId) => itemId !== id);
    this.collection = newCollection;
  }

  toggleCollectionState(id: number) {
    const inCollection = this.inCollection(id);

    if (inCollection) {
      this.removeFromCollection(id);
    } else {
      this.addToCollection(id);
    }
  }

  mapToWithCollection = <T extends Model<unknown>>(
    model: T
  ): ModelWithCollectionState<T> => {
    const inCollection = this.inCollection(model.id);

    (model as ModelWithCollectionState<T>).inCollection = inCollection;

    return model as ModelWithCollectionState<T>;
  };
}
