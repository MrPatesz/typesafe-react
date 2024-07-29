import { Fragment, type Key, type ReactNode } from 'react';
import { type ConditionalProperties } from '../types/conditionalProperties';
import { type IsNotEqual } from '../types/isNotEqual';

/**
 * Component for rendering lists.
 * @param each Array to iterate over.
 * @param keyFn Function that returns the key for each item.
 * @param children Function that returns the content for each item. No need to define key here.
 * @param fallback Content to render if 'each' is nullish. Must be provided when 'each' is nullable.
 */
export const For = <
  E extends ReadonlyArray<I> | null | undefined,
  I = E extends ReadonlyArray<infer T> ? T : never,
>({
  each,
  keyFn,
  children,
  ...rest
}: {
  each: E;
  keyFn: (item: NoInfer<I>, index: number) => Key;
  children: (item: NoInfer<I>, index: number) => ReactNode;
} & ConditionalProperties<IsNotEqual<E, NonNullable<E>>, { fallback: ReactNode }>) => {
  if (each) {
    return each.map((item, index) => {
      const key = keyFn(item, index);
      const element = children(item, index);
      return <Fragment key={key}>{element}</Fragment>;
    });
  } else if ('fallback' in rest) {
    return rest.fallback as ReactNode;
  } else {
    throw new Error(`"each" was nullish and "fallback" wasn't provided!`);
  }
};
