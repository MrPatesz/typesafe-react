import { type IsEqual } from 'type-fest';

export type IsNotEqual<T, U> = IsEqual<T, U> extends true ? false : true;
