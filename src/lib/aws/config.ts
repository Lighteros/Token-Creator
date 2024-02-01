import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'

/**
 * Creates an S3Client object.
 *
 * @return {S3Client} The created S3Client object.
 */
function createS3Client(): S3Client {
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS credentials not set')
  }
  const config: S3ClientConfig = {
    // Localstack setup
    ...(process.env.NODE_ENV === 'development' && {
      endpoint: 'http://127.0.0.1:4566',
      forcePathStyle: true,
      tls: false,
    }),
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  }

  return new S3Client(config)
}

export { createS3Client }
