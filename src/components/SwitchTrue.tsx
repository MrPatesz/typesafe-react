import { type ReactNode } from 'react';
import { switchTrue } from '../functions/switchTrue';

/**
 * Switch true component.
 * @param cases Array of tuples. Each tuple has a callback that returns a condition and a callback that will run if the condition is truthy and return content.
 * @param fallback Default branch that returns content.
 */
export const SwitchTrue = ({
  cases,
  fallback,
}: {
  cases: ReadonlyArray<[() => unknown, () => ReactNode]>;
  fallback?: () => ReactNode;
}) => {
  return switchTrue(cases, fallback);
};
