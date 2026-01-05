export async function withRetry({
  fn,
  retries = 3,
  delay = 2000,
  backoff = 2,
  abortSignal,
  isRetryable,
}) {
  let attempt = 0;
  let lastError;

  while (attempt < retries) {
    if (abortSignal?.aborted) {
      throw new Error("JOB_CANCELLED");
    }

    try {
      return await fn(attempt);
    } catch (err) {
      lastError = err;

      if (
        abortSignal?.aborted ||
        (isRetryable && !isRetryable(err))
      ) {
        throw err;
      }

      attempt++;

      if (attempt >= retries) break;

      const wait = delay * Math.pow(backoff, attempt - 1);
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  throw lastError;
}
