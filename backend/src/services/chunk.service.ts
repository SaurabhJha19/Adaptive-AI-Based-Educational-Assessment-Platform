export const splitIntoParagraphs =
  (text: string) => {

    return text
      .split(/\n\s*\n/)
      .map(chunk => chunk.trim())
      .filter(
        chunk => chunk.length > 0
      );
  };