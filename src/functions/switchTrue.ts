import { type IsEqual } from 'type-fest';

/**
 * Switch true statement with return value.
 * @param cases Array of tuples. Each tuple has a callback that returns a condition and a callback that will run if the condition is truthy.
 * @param fallback Default branch.
 */
export const switchTrue = <const C extends [() => unknown, () => unknown], const F = never>(
  cases: ReadonlyArray<C>,
  fallback?: () => F
): C extends [() => unknown, () => infer R] ?
  IsEqual<F, never> extends true ?
    R | undefined
  : R | F
: never => {
  type Result = ReturnType<typeof switchTrue<C, F>>;

  const match = cases.find(([caseExpression]) => Boolean(caseExpression()));

  if (match) {
    return match[1]() as Result;
  } else {
    return fallback?.() as Result;
  }
};
