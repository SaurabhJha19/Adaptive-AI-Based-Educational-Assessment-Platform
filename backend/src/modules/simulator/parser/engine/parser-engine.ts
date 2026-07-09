import { ParserContext } from "./parser-context";
import { ParserLogger } from "./logger";

// export interface ParserContext {

//     exam: string;

//     filePath: string;

//     metadata?: Record<string, any>;

// }

export interface ParserStage {

    name: string;

    execute(
        context: ParserContext
    ): Promise<void>;

}

export class ParserEngine {

    constructor(

        private readonly stages: ParserStage[]

    ) {}

    async run(

        context: ParserContext

    ) {

        for (

            const stage

            of this.stages

        ) {

            ParserLogger.info(

                `Running ${stage.name}`

            );

            await stage.execute(

                context

            );

        }

    }

}