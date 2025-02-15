export type ConditionalProperties<C extends boolean, P extends object> =
    C extends true ? P : unknown;
