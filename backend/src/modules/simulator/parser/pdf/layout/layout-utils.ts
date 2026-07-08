import { PdfTextItem } from "../pdf-item";

export function averageFontSize(
    items: PdfTextItem[]
) {

    if (!items.length)
        return 0;

    return (
        items.reduce(

            (sum, item) =>

                sum +
                item.fontSize,

            0

        ) / items.length
    );

}

export function lineText(
    items: PdfTextItem[]
) {

    return items

        .sort(

            (a, b) =>

                a.x - b.x

        )

        .map(

            item => item.text

        )

        .join(" ");

}