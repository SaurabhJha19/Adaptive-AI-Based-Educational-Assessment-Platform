export class ParserLogger {

  static info(message: string) {

    console.log(
      `[Parser] ${message}`
    );

  }

  static success(message: string) {

    console.log(
      `✅ ${message}`
    );

  }

  static error(message: string) {

    console.error(
      `❌ ${message}`
    );

  }

}