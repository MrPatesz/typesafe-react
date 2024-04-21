import { type IsNotEqual } from '../types/isNotEqual';
import { type EnumToUnion } from '../types/enumToUnion';

/**
 * Switch with return value. Must be exhaustive or receive fallback.
 * @param expression Expression to evaluate.
 * @param cases Record that maps each possible value of 'expression' to a return value.
 * @param fallback Default case.
 */
export const when = <E extends string | number, CE extends E, const R>(
  expression: E,
  cases: Record<CE, R>,
  ...fallback: (
    string extends E ? true
    : number extends E ? true
    : IsNotEqual<EnumToUnion<E>, EnumToUnion<CE>>
  ) extends true ?
    [R]
  : []
) => {
  if (expression in cases) {
    return cases[expression as CE];
  } else if (fallback.length) {
    return fallback.at(0) as R;
  } else {
    throw new Error(`The expression did not match any case and fallback wasn't provided!`);
  }
};
