import { type ReactNode } from 'react';

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
