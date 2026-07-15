import { AnyBlock } from "../../../document/core";

export interface QuestionRegion {

    id: string;

    page: number;

    column: 1 | 2;

    top: number;

    bottom: number;

    left: number;

    right: number;

    blocks: AnyBlock[];

}