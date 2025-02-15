import type { Result } from '../types/result';

/**
 * Function that retries a callback function upon failure.
 * @param fn Callback function that we want to retry upon failure.
 * @param retries Number of retries to attempt.
 * @param delay Delay in milliseconds between retries.
 */
export const retry = async <T>(
    fn: () => Promise<Result<T>>,
    retries: number,
    delay = 0
): Promise<Result<T>> => {
    const result = await fn();

    if (result.success || 0 >= retries) {
        return result;
    }

    if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
    }
    return await retry(fn, retries - 1, delay);
};
