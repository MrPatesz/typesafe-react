import { type ReactNode } from 'react';
import { type IsEqual } from 'type-fest';
import { type NonNullableElements } from '../types/nonNullableElements';

/**
 * Component to conditionally render content.
 * @param when Single condition to evaluate.
 * @param whenAll Multiple conditions to evaluate.
 * @param fallback Content to render if 'when' is falsy or 'whenAll' contains some falsy elements.
 * @param children Content or callback that receives 'when' or 'whenAll' and returns content to render if 'when' is truthy or 'whenAll' only contains truthy elements.
 */
export function Show<
    W = never,
    const T extends ReadonlyArray<unknown> = never,
>({
    fallback,
    children,
    ...rest
}: ({ when: W } | { whenAll: T }) & {
    children:
        | ReactNode
        | ((
              data: NoInfer<
                  IsEqual<W, never> extends true ? NonNullableElements<T>
                  :   NonNullable<W>
              >
          ) => ReactNode);
    fallback?: ReactNode;
}) {
    if ('when' in rest) {
        if (!rest.when) {
            return fallback;
        }
        return children instanceof Function ?
                children(rest.when as Parameters<typeof children>[0])
            :   children;
    } else {
        if (rest.whenAll.some((w) => !w)) {
            return fallback;
        }
        return children instanceof Function ?
                children(rest.whenAll as Parameters<typeof children>[0])
            :   children;
    }
}
