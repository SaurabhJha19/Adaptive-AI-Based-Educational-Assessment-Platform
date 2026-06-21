export const selectDiverseChunks =
  (
    chunks: any[],
    maxChunks = 8
  ) => {

    const selected = [];
    const seen = new Set();

    for (const chunk of chunks) {

      const normalized =
        chunk.content
          .toLowerCase()
          .replace(/\s+/g, " ")
          .substring(0, 250);

      if (
        seen.has(normalized)
      ) {
        continue;
      }

      seen.add(normalized);

      selected.push(chunk);

      if (
        selected.length >=
        maxChunks
      ) {
        break;
      }
    }

    return selected;
  };