import { Fragment, type Key, type ReactNode } from 'react';

/**
 * Component for rendering lists.
 * @param each Array to iterate over.
 * @param keyFn Function that returns the key for each item.
 * @param children Function that returns the content for each item. No need to define key here.
 * @param fallback Content to render if 'each' is empty.
 */
export const For = <I extends NonNullable<unknown>>({
  each,
  keyFn,
  children,
  fallback,
}: {
  each: ReadonlyArray<I>;
  keyFn: (item: NoInfer<I>, index: number) => Key;
  children: (item: NoInfer<I>, index: number) => ReactNode;
  fallback?: ReactNode;
}) => {
  if (!each.length) {
    return fallback;
  }
  return each.map((item, index) => {
    const key = keyFn(item, index);
    const element = children(item, index);
    return <Fragment key={key}>{element}</Fragment>;
  });
};
