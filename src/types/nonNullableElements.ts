export type NonNullableElements<
  N extends ReadonlyArray<unknown>,
  Acc extends ReadonlyArray<unknown> = [],
> =
  N['length'] extends Acc['length'] ? Acc
  : NonNullableElements<N, [...Acc, NonNullable<N[Acc['length']]>]>;
