export const formatCitation =
  (
    documentName: string,
    snippet: string
  ) => {

    return {
      documentName,

      snippet:
        snippet.length > 200
          ? snippet.substring(
              0,
              200
            ) + "..."
          : snippet,
    };
  };