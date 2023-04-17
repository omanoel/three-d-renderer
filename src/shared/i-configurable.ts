export interface IConfigurable<T> {
    updateWithOptions: (options: Partial<T>) => void;
}