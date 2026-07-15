import { ParserStage } from "./parser-stage";

export class ParserPipeline<T> {

    private readonly stages: ParserStage<any, any>[] = [];

    add<I, O>(
        stage: ParserStage<I, O>
    ): this {

        this.stages.push(stage);

        return this;

    }

    async run(
        input: T
    ): Promise<any> {

        let current: any = input;

        for (const stage of this.stages) {

            current = await stage.run(current);

        }

        return current;

    }

}