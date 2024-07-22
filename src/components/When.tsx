import { type ReactNode } from 'react';
import { when } from '../functions/when';
import { type ConditionalProperties } from '../types/conditionalProperties';
import { type IsNotEqual } from '../types/isNotEqual';
import { type EnumToUnion } from '../types/enumToUnion';

/**
 * Exhaustive switch component.
 * @param expression Expression to evaluate.
 * @param cases Record that maps some or all possible values of 'expression' to a branch that returns content.
 * @param fallback Default branch that returns content. Mandatory if 'cases' does not cover all possible values of 'expression'.
 */
export const When = <E extends string | number, CE extends E>({
  expression,
  cases,
  ...rest
}: {
  expression: E;
  cases: Record<CE, () => ReactNode>;
} & ConditionalProperties<
  string extends E ? true
  : number extends E ? true
  : IsNotEqual<EnumToUnion<E>, EnumToUnion<CE>>,
  { fallback: () => ReactNode }
>) => {
  const parameters = [
    expression,
    cases,
    ...('fallback' in rest ? [rest.fallback] : []),
  ] as Parameters<typeof when<E, CE, ReactNode, ReactNode>>;

  return when<E, CE, ReactNode, ReactNode>(...parameters);
};
