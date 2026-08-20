/**
 * AURA Wardrobe — Error Handling Utilities
 */

export class AuraError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuraError';
  }
}

export class NetworkError extends AuraError {
  constructor(message = 'Network request failed') {
    super(message, 'NETWORK_ERROR');
  }
}

export class AuthError extends AuraError {
  constructor(message = 'Authentication required') {
    super(message, 'AUTH_ERROR');
  }
}

export class AIProviderError extends AuraError {
  constructor(provider: string, message: string) {
    super(message, 'AI_PROVIDER_ERROR', { provider });
  }
}

/**
 * Safely extract a human-readable error message.
 * Never expose raw internal errors to the UI.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AuraError) {
    return error.message;
  }
  if (error instanceof Error) {
    // Don't leak internal messages in production
    if (__DEV__) {
      return error.message;
    }
    return 'Something went wrong. Please try again.';
  }
  return 'An unexpected error occurred.';
}

/**
 * Wrap an async function with error handling.
 * Returns [result, null] on success, [null, error] on failure.
 */
export async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<[T, null] | [null, Error]> {
  try {
    const result = await fn();
    return [result, null];
  } catch (err) {
    return [null, err instanceof Error ? err : new Error(String(err))];
  }
}
