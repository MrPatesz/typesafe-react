/**
 * Result type that functions can use to indicate failure instead of throwing.
 */
export type Result<T> =
    | {
          success: false;
          error: unknown;
          data?: never;
      }
    | {
          success: true;
          data: T;
          error?: never;
      };
