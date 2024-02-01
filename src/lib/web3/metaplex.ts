import { web3 } from '@coral-xyz/anchor'
import { createS3Client } from 'src/lib/aws/config'
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
import { awsStorage } from '@metaplex-foundation/js-plugin-aws'
import { payer } from './connection'

const s3Client = createS3Client()

const bucketName = process.env.S3_BUCKET_NAME

const network = process.env.NETWORK === 'mainnet' ? 'mainnet-beta' : 'devnet'

export const connection = new web3.Connection(
  web3.clusterApiUrl(network),
  'confirmed'
)

export const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(payer))
  .use(awsStorage(s3Client, bucketName!))
