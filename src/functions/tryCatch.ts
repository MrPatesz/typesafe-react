import type { Result } from '../types/result';

/**
 * Wrapper function that converts a function call that may throw into a function call that returns a `Result`.
 * @param fn Callback function that we want to try.
 * @param finallyFn Callback function that we want to run regardless of the result.
 */
export const tryCatch = <T>(fn: () => T, finallyFn?: () => void): Result<T> => {
    try {
        const data = fn();
        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    } finally {
        finallyFn?.();
    }
};

/**
 * Wrapper function that converts an async function call that may throw into an async function call that returns a `Result`.
 * @param fn Callback function that we want to try.
 * @param finallyFn Callback function that we want to run regardless of the result.
 */
export const tryCatchAsync = async <T>(
    fn: () => Promise<T>,
    finallyFn?: () => void | Promise<void>
): Promise<Result<T>> => {
    try {
        const data = await fn();
        return { success: true, data };
    } catch (error) {
        return { success: false, error };
    } finally {
        await finallyFn?.();
    }
};
