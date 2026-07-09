import {

    ParserStage,

} from "./parser-engine";

export class Pipeline {

    constructor(

        private readonly stages: ParserStage[]

    ) {}

    getStages() {

        return this.stages;

    }

}