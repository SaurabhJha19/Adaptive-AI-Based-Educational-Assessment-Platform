export interface ParsedPage {
  page: number;
  content: string;
}

export function splitPages(
  text: string
): ParsedPage[] {

  const pages = text
    .split(/\f/g)
    .map((page, index) => ({
      page: index + 1,
      content: page.trim(),
    }));

  return pages;
}