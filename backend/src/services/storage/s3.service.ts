import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import { Upload }
from "@aws-sdk/lib-storage";

import { s3Client }
from "../../config/aws";

import { env }
from "../../config/env";

export const uploadFileToS3 =
  async (
    file: Express.Multer.File,
    key: string
  ) => {

    const upload =
      new Upload({
        client: s3Client,

        params: {
          Bucket:
            env.AWS_S3_BUCKET_NAME,

          Key: key,

          Body: file.buffer,

          ContentType:
            file.mimetype,
        },
      });

    await upload.done();

    return {
      key,

      url:
        `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${key}`,
    };
  };

export const deleteFileFromS3 =
  async (
    key: string
  ) => {

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket:
          env.AWS_S3_BUCKET_NAME,

        Key: key,
      })
    );
  };

export const getFileStreamFromS3 =
  async (
    key: string
  ) => {

    const response =
      await s3Client.send(
        new GetObjectCommand({
          Bucket:
            env.AWS_S3_BUCKET_NAME,

          Key: key,
        })
      );

    return response.Body;
  };