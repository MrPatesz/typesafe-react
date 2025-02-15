import type { AnyFunction } from '../types/anyFunction';

export const isFunction = (value: unknown): value is AnyFunction =>
    typeof value === 'function';
