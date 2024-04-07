import { type PropsWithChildren, type ReactElement } from 'react';

export const Show = ({
  children,
  when,
  fallback,
}: PropsWithChildren<{ when: unknown; fallback?: ReactElement }>) => {
  return <>{when ? children : fallback}</>;
};
