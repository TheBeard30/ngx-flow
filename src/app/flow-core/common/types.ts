export type Abstract<T> = {
  prototype: T;
};
export type Newable<T> = new (...args: any[]) => T;
export type Token<T> = string | symbol | Newable<T> | Abstract<T>;
export type Simplify<T> = Pick<T, keyof T>;
