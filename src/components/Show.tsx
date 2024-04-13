import { type ReactNode } from 'react';

/**
 * Component to conditionally render content. Either children or childrenFn must be provided.
 * @param when Condition to evaluate.
 * @param fallback Content to render if 'when' is falsy.
 * @param children Content to render if 'when' is truthy.
 * @param childrenFn Callback that receives 'when' and returns content to render if 'when' is truthy.
 */
export const Show = <T,>({
  when,
  fallback,
  ...rest
}: { when: T; fallback?: ReactNode } & (
  | {
      children: ReactNode;
    }
  | {
      children?: never;
      childrenFn: (data: NonNullable<T>) => ReactNode;
    }
)) => {
  if (!when) {
    return fallback;
  }
  return 'childrenFn' in rest ? rest.childrenFn(when) : rest.children;
};
