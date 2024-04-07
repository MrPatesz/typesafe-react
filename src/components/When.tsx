import { type ReactElement } from 'react';
import { type WhenParameters, when } from '../functions/when';

export const When = <E extends string | number, CE extends E>(
  props: WhenParameters<E, CE, ReactElement>
) => {
  return when(props);
};
