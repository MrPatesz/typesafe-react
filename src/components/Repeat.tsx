import { Fragment, type ReactNode } from 'react';
import { isFunction } from '../utils/isFunction';

/**
 * Component to render content multiple times. Useful for displaying the loading skeleton of a list.
 * @param times Number of times to repeat content.
 * @param children Content or callback that receives index and returns content to repeat.
 */
export const Repeat = ({
    times,
    children,
}: {
    times: number;
    children: ReactNode | ((index: number) => ReactNode);
}) => {
    return Array.from({ length: times }, (_, index) => {
        const element = isFunction(children) ? children(index) : children;
        return <Fragment key={index}>{element}</Fragment>;
    });
};
