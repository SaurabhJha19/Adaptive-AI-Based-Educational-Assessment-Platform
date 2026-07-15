export type ExamAssetType =
    | "image"
    | "table"
    | "graph"
    | "figure"
    | "formula";

export interface ExamAsset {

    id: string;

    type: ExamAssetType;

    page: number;

    caption?: string;

    imageUrl?: string;

    bbox?: {

        left: number;

        top: number;

        right: number;

        bottom: number;

    };

}