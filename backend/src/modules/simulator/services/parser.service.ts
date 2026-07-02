export class ParserService {
  async parse(pdfUrl: string) {
    throw new Error("Parser not implemented.");
  }
}

export default new ParserService();