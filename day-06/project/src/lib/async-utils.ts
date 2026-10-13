// 11.2

export function delay(
  milliseconds: number
): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function withTimeout<T>(
  promise: Promise<T>,
  milliseconds: number
): Promise<T> {
  const timeout = new Promise<never>(
    (_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Operation timed out after ${milliseconds}ms`
          )
        );
      }, milliseconds);
    }
  );

  return Promise.race([
    promise,
    timeout
  ]);
}

export async function retry<T>(
  operation: () => Promise<T>,
  attempts: number
): Promise<T> {
  let lastError: unknown;

  for (
    let attempt = 1;
    attempt <= attempts;
    attempt++
  ) {
    try {
      return await operation();
    } catch (error: unknown) {
      lastError = error;
    }
  }

  throw lastError;
}

export function errorMessage(
  error: unknown
): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}