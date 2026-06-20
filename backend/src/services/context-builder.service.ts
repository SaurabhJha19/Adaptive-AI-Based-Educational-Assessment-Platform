export const buildContext = (
  chunks: {
    content: string;
  }[]
): string => {

  return chunks
    .map(
      (chunk) => chunk.content
    )
    .join("\n\n");
};