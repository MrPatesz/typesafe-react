import { cloneElement, type ReactElement, type ReactNode } from 'react';
import { type ConditionalProperties } from '../types/conditionalProperties';
import { type IsNotEqual } from '../types/isNotEqual';

/**
 * Component for rendering lists.
 * @param each Array to iterate over.
 * @param getKey Function that returns the key for each item. Index will be used when this is null.
 * @param mapFn Function that returns the content for each item. No need to define key here.
 * @param fallback Content to render if 'each' is nullish. Must be provided when 'each' is nullable.
 */
export const For = <
  E extends ReadonlyArray<unknown> | null | undefined,
  I = E extends ReadonlyArray<infer T> ? T : never,
>({
  each,
  getKey,
  mapFn,
  ...rest
}: {
  each: E;
  getKey: ((item: NoInfer<I>) => string | number) | null;
  mapFn: (item: NoInfer<I>, index: number) => ReactElement;
} & ConditionalProperties<IsNotEqual<E, NonNullable<E>>, { fallback: ReactNode }>) => {
  if (each) {
    return (each as ReadonlyArray<I>).map((item, index) => {
      const element = mapFn(item, index);
      const key = getKey?.(item) ?? index;
      return cloneElement(element, { key });
    });
  } else if ('fallback' in rest) {
    return rest.fallback as ReactNode;
  } else {
    throw new Error(`Each was nullish and fallback wasn't provided!`);
  }
};
