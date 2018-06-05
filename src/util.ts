import * as DataLoader from 'dataloader';

export function loadFromDataLoader<K, V>(dataloader: DataLoader<K, V>, keys: K[], callback: AWSLambda.Callback): void {
  dataloader.loadMany(keys)
    .then(callback.bind(null, null))
    .catch(callback);
}

export function loadFromResolver<V>(resolver: () => Promise<V[]>, callback: AWSLambda.Callback): void {
  resolver()
    .then(callback.bind(null, null))
    .catch(callback);
}
