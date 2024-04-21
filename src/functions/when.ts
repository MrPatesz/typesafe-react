import { type ConditionalProperties } from '../types/conditionalProperties';
import { type IsNotEqual } from '../types/isNotEqual';
import { type EnumToUnion } from '../types/enumToUnion';

export type WhenParameters<E extends string | number, CE extends E, R> = {
  expression: E;
  cases: Record<CE, R>;
} & ConditionalProperties<
  string extends E ? true
  : number extends E ? true
  : IsNotEqual<EnumToUnion<E>, EnumToUnion<CE>>,
  { fallback: R }
>;

/**
 * Switch with return value. Must be exhaustive or receive fallback.
 * @param expression Expression to evaluate.
 * @param cases Record that maps each possible value of 'expression' to a return value.
 * @param fallback Default case.
 */
export const when = <E extends string | number, CE extends E, const R>({
  expression,
  cases,
  ...rest
}: WhenParameters<E, CE, R>) => {
  if (expression in cases) {
    return cases[expression as CE];
  } else if ('fallback' in rest) {
    return rest.fallback as R;
  } else {
    throw new Error(`The expression did not match any case and fallback wasn't provided!`);
  }
};
