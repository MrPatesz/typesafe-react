import { type IsEqual } from 'type-fest';

type If<C extends boolean, P extends object> = C extends true ? P : unknown;

type IsNotEqual<T, U> = IsEqual<T, U> extends true ? false : true;

type ToUnion<E extends string | number> = `${E}`;

export type WhenParameters<E extends string | number, CE extends E, R> = {
  expression: E;
  cases: Record<CE, R>;
} & If<
  IsEqual<E, string> extends true ? true
  : IsEqual<E, number> extends true ? true
  : IsNotEqual<ToUnion<E>, ToUnion<CE>>,
  { fallback: R }
>;

export const when = <E extends string | number, CE extends E, R>({
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
