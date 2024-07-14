import { type ReactNode } from 'react';
import { type NonNullableElements } from '../types/nonNullableElements';
import { type IsEqual } from 'type-fest';

/**
 * Component to conditionally render content.
 * @param when Single condition to evaluate.
 * @param whenAll Multiple conditions to evaluate.
 * @param fallback Content to render if 'when' is falsy or 'whenAll' contains some falsy elements.
 * @param children Children callback that receives 'when' or 'whenAll' and returns content to render if 'when' is truthy or 'whenAll' only constains truthy elements.
 */
export function Show<W = never, const T extends ReadonlyArray<unknown> = never>({
  fallback,
  children,
  ...rest
}: {
  fallback?: ReactNode;
  children: (
    data: IsEqual<W, never> extends true ? NonNullableElements<T> : NonNullable<W>
  ) => ReactNode;
} & (
  | {
      when: W;
    }
  | {
      whenAll: T;
    }
)) {
  if ('when' in rest) {
    if (!rest.when) {
      return fallback;
    }
    return children(rest.when as Parameters<typeof children>[0]);
  } else {
    if (rest.whenAll.some((w) => !w)) {
      return fallback;
    }
    return children(rest.whenAll as Parameters<typeof children>[0]);
  }
}
