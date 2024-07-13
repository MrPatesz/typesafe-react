import { type ReactNode } from 'react';
import { type NonNullableElements } from '../types/nonNullableElements';
import { type XOR } from '../types/xor';

/**
 * Component to conditionally render content.
 * @param when Single condition to evaluate.
 * @param whenAll Multiple conditions to evaluate.
 * @param fallback Content to render if 'when' is falsy or 'whenAll' contains some falsy elements.
 * @param children Content to render if 'when' is truthy or 'whenAll' only constains truthy elements.
 * @param childrenFn Callback that receives 'when' or 'whenAll' and returns content to render if 'when' is truthy or 'whenAll' only constains truthy elements.
 */
export function Show<W>(
  props: { when: W; fallback?: ReactNode } & XOR<
    {
      children: ReactNode;
    },
    {
      childrenFn: (data: NonNullable<W>) => ReactNode;
    }
  >
): ReactNode;

export function Show<const T extends ReadonlyArray<unknown>>(
  props: {
    whenAll: T;
    fallback?: ReactNode;
  } & XOR<
    {
      children: ReactNode;
    },
    {
      childrenFn: (data: NonNullableElements<T>) => ReactNode;
    }
  >
): ReactNode;

export function Show(props: {
  when?: unknown;
  whenAll?: ReadonlyArray<unknown>;
  fallback?: ReactNode;
  children?: ReactNode;
  childrenFn?: unknown;
}): ReactNode {
  if ('when' in props) {
    if (!props.when) {
      return props.fallback;
    }
    if ('childrenFn' in props && props.childrenFn instanceof Function) {
      return props.childrenFn(props.when);
    }
    return props.children;
  } else if ('whenAll' in props && Array.isArray(props.whenAll)) {
    if (props.whenAll.some((w) => !w)) {
      return props.fallback;
    }
    if ('childrenFn' in props && props.childrenFn instanceof Function) {
      return props.childrenFn(props.whenAll);
    }
    return props.children;
  } else {
    throw new Error(`Neither "when" nor "whenAll" was provided!`);
  }
}
