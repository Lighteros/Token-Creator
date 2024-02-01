import { AnchorProvider, Wallet, web3 } from '@coral-xyz/anchor'
import { bs58 } from '@coral-xyz/anchor/dist/cjs/utils/bytes'

const network = process.env.NETWORK === 'mainnet' ? 'mainnet-beta' : 'devnet'
const privateKey =
  process.env.PRIVATE_KEY || bs58.encode(web3.Keypair.generate().secretKey)

export const connection = new web3.Connection(
  web3.clusterApiUrl(network),
  'confirmed'
)

export const payer = web3.Keypair.fromSecretKey(bs58.decode(privateKey))

export const provider = new AnchorProvider(connection, new Wallet(payer), {
  commitment: 'confirmed',
})
