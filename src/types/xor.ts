export type XOR<T extends object, U extends object> =
  | (T & { [k in keyof U]?: never })
  | (U & { [k in keyof T]?: never });
