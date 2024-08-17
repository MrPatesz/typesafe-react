import { type IsNotEqual } from '../types/isNotEqual';
import { type EnumToUnion } from '../types/enumToUnion';

type IsNotExhaustive<E extends string | number, CE extends E> =
  string extends E ? true
  : number extends E ? true
  : IsNotEqual<EnumToUnion<E>, EnumToUnion<CE>>;

/**
 * Exhaustive switch statement with return value.
 * @param expression Expression to evaluate.
 * @param cases Record that maps some or all possible values of 'expression' to a branch.
 * @param fallback Default branch. Mandatory (and only allowed) if 'cases' does not cover all possible values of 'expression'.
 */
export const when = <
  E extends string | number,
  CE extends E,
  const C extends () => unknown,
  const F,
>(
  expression: E,
  cases: Record<CE, C>,
  ...fallback: IsNotExhaustive<E, CE> extends true ? [() => F] : []
): C extends () => infer R ?
  IsNotExhaustive<E, CE> extends true ?
    R | F
  : R
: never => {
  type Result = ReturnType<typeof when<E, CE, C, F>>;

  if (expression in cases) {
    return cases[expression as CE]() as Result;
  } else if (fallback.length) {
    return fallback[0]() as Result;
  } else {
    throw new Error(`"expression" did not match any case and "fallback" wasn't provided!`);
  }
};
