import { type ReactNode } from 'react';
import { when } from '../functions/when';
import { type ConditionalProperties } from '../types/conditionalProperties';

type ParametersOfWhen<E extends string | number, CE extends E> = Parameters<
  typeof when<E, CE, () => ReactNode, ReactNode>
>;

type IsNotExhaustive<E extends string | number, CE extends E> =
  ParametersOfWhen<E, CE>[2] extends () => ReactNode ? true : false;

/**
 * Exhaustive switch component.
 * @param expression Expression to evaluate.
 * @param cases Record that maps some or all possible values of 'expression' to a branch that returns content.
 * @param fallback Default branch that returns content. Mandatory (and only allowed) if 'cases' does not cover all possible values of 'expression'.
 */
export const When = <E extends string | number, CE extends E>({
  expression,
  cases,
  ...rest
}: {
  expression: E;
  cases: Record<CE, () => ReactNode>;
} & ConditionalProperties<IsNotExhaustive<E, CE>, { fallback: () => ReactNode }>) => {
  const parameters = [
    expression,
    cases,
    ...('fallback' in rest ? [rest.fallback] : []),
  ] as ParametersOfWhen<E, CE>;

  return when<E, CE, () => ReactNode, ReactNode>(...parameters);
};
