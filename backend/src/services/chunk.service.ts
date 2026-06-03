export const splitIntoParagraphs =
  (
    text: string,
    maxChunkSize = 1000
  ) => {

    const paragraphs =
      text
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);

    const chunks: string[] = [];

    for (
      const paragraph
      of paragraphs
    ) {

      if (
        paragraph.length <=
        maxChunkSize
      ) {
        chunks.push(paragraph);
        continue;
      }

      for (
        let i = 0;
        i < paragraph.length;
        i += maxChunkSize
      ) {

        chunks.push(
          paragraph.slice(
            i,
            i + maxChunkSize
          )
        );
      }
    }

    return chunks;
  };