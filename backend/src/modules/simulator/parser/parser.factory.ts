import satParserService from "./sat/sat-parser.service";

class ParserFactory {

  getParser(examType: string) {

    switch (examType) {

      case "SAT":
        return satParserService;

      default:
        throw new Error(`No parser found for ${examType}`);

    }

  }

}

export default new ParserFactory();