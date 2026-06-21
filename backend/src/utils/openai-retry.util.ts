export const withRetry =
  async <T>(
    operation: () => Promise<T>,
    retries = 3
  ): Promise<T> => {

    let lastError;

    for (
      let i = 0;
      i < retries;
      i++
    ) {

      try {

        return await operation();

      } catch (error) {

        lastError = error;

        await new Promise(
          resolve =>
            setTimeout(
              resolve,
              1000
            )
        );
      }
    }

    throw lastError;
  };