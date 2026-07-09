import {

    PdfJsExtractor,

} from "../../extractors/pdfjs";

const extractor =
    new PdfJsExtractor();

export async function extractText(
    pdf: Buffer
) {

    return extractor.extract(
        pdf
    );

}