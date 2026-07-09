import { GetObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "../../../../../config/aws";
import { env } from "../../../../../config/env";

export async function downloadPdf(
    keyOrUrl: string
): Promise<Buffer> {

    let key = keyOrUrl;

    if (
        key.startsWith("http://") ||
        key.startsWith("https://")
    ) {

        const url =
            new URL(key);

        key =
            decodeURIComponent(
                url.pathname.substring(1)
            );

    }

    const command =
        new GetObjectCommand({

            Bucket:
                env.AWS_S3_BUCKET_NAME,

            Key:
                key,

        });

    const response =
        await s3Client.send(
            command
        );

    if (!response.Body) {

        throw new Error(
            "Unable to download PDF from S3."
        );

    }

    const chunks: Uint8Array[] = [];

    for await (
        const chunk of response.Body as AsyncIterable<Uint8Array>
    ) {

        chunks.push(chunk);

    }

    return Buffer.concat(chunks);

}