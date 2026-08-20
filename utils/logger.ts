/**
 * AURA Wardrobe — Safe Logger
 *
 * Rules:
 * - Never log API keys, passwords, or secrets
 * - Never log private image data
 * - Production logs should be minimal
 * - Dev logs are verbose
 */

const isDev = __DEV__;

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function sanitize(args: unknown[]): unknown[] {
  // Redact any obvious secret patterns
  return args.map((arg) => {
    if (typeof arg === 'string') {
      // Redact anything that looks like a key/token
      return arg
        .replace(/sk-[a-zA-Z0-9]+/g, '[REDACTED_KEY]')
        .replace(/eyJ[a-zA-Z0-9+/=]+/g, '[REDACTED_JWT]');
    }
    if (typeof arg === 'object' && arg !== null) {
      // Don't log raw objects in production
      return isDev ? arg : '[object]';
    }
    return arg;
  });
}

export const logger = {
  debug(...args: unknown[]) {
    if (isDev) {
      console.log('[AURA:debug]', ...sanitize(args));
    }
  },

  info(...args: unknown[]) {
    if (isDev) {
      console.log('[AURA:info]', ...sanitize(args));
    }
  },

  warn(...args: unknown[]) {
    console.warn('[AURA:warn]', ...sanitize(args));
  },

  error(...args: unknown[]) {
    // Always log errors (sanitized)
    console.error('[AURA:error]', ...sanitize(args));
    // Phase 26+: Send to crash monitoring (e.g. Sentry) — sanitized
  },
};
