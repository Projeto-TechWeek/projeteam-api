export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export type RequiredKeys<T> = Exclude<KeysOfType<T, Exclude<T[keyof T], undefined | null>>, undefined>;

export type ExcludeOptionalProps<T> = Pick<T, RequiredKeys<T>>;

export type ExcludeOptionals<T> = Pick<T, RequiredKeys<T>>;

export type Override<T, O> = Omit<T, keyof O> & {
  [K in keyof O]: O[K];
};
