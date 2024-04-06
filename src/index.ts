import { type IsEqual } from 'type-fest';

type If<C extends boolean, P extends object> = C extends true ? P : unknown;

type IsNotEqual<T, U> = IsEqual<T, U> extends true ? false : true;

type ToUnion<E extends string | number> = `${E}`;

export type WhenParameters<E extends string | number, CE extends E, R> = {
  expression: E;
  cases: Record<CE, R>;
} & If<
  IsEqual<E, string> extends true
    ? true
    : IsEqual<E, number> extends true
    ? true
    : IsNotEqual<ToUnion<E>, ToUnion<CE>>,
  { fallback: R }
>;

export const when = <E extends string | number, CE extends E, R>({
  expression,
  cases,
  ...rest
}: WhenParameters<E, CE, R>) => {
  if (!(expression in cases || 'fallback' in rest)) {
    throw new Error(`The expression did not match any case and fallback wasn't provided!`);
  }

  const match = cases[expression as CE] as R | undefined;
  const fallback = (rest as { fallback?: R }).fallback;

  return (match ?? fallback) as R;
};