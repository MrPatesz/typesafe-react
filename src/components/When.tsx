import { type ReactElement } from 'react';
import { type WhenParameters, when } from '../functions/when';

/**
 * Switch component. Must be exhaustive or receive fallback.
 * @param expression Expression to evaluate.
 * @param cases Record that maps each possible value of 'expression' to content.
 * @param fallback Default content.
 */
export const When = <E extends string | number, CE extends E>(
  props: WhenParameters<E, CE, ReactElement>
) => {
  return when(props);
};
