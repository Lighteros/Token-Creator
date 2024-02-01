import { TokenStandard } from '@metaplex-foundation/mpl-token-metadata'
import { program } from 'commander'
import chalk from 'chalk'
import winston from 'winston'
import ora from 'ora'
import { metaplex } from '@lib/web3/metaplex'
import { token } from '@metaplex-foundation/js'
import { web3 } from '@coral-xyz/anchor'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

program.version('0.0.1').description('A simple CLI tool')

program
  .command('echo <message>')
  .description('Echos input to console')
  .action((message: string) => {
    const spinner = ora('Echoing message to console...').start()
    setTimeout(() => {
      console.log(chalk.green(message))
      spinner.succeed('Done echoing message')
    }, 2000)
    logger.info(`Echoed message: ${message}`)
  })

program
  .command('create-token')
  .description('Create a token')
  .option('-n, --name <string>', 'The name of the token')
  .option('-s, --symbol <string>', 'The symbol of the token')
  .option('-u, --uri <string>', 'The URI of the token')
  .option('-d, --decimals <number>', 'The decimal of the token', parseFloat)
  .option(
    '--sellerFeeBasisPoints [number]',
    'The sellerFeeBasisPoints of the Token',
    parseFloat,
    250
  )
  .action(async (options, command) => {
    const { name, symbol, uri, decimals, sellerFeeBasisPoints } = options
    const spinner = ora('Creating token...').start()
    const { mintAddress } = await metaplex.nfts().createSft({
      uri,
      name,
      symbol,
      sellerFeeBasisPoints,
      decimals,
      tokenStandard: TokenStandard.Fungible,
    })
    spinner.succeed(`Token ${name} created: ${mintAddress.toBase58()}`)
    logger.info(`Created token: ${mintAddress.toBase58()}`)
  })

program
  .command('mint-token')
  .description('Mint a token')
  .option('-m, --mint <string>', 'The mint address of the token')
  .option('-a, --amount <number>', 'The amount to mint', parseFloat, 1000000)
  .option(
    '-d, --decimals <number>',
    'The decimal to mint amount',
    parseFloat,
    9
  )
  .option('--to [ADDRESS]', 'The address to mint to')
  .action(async (options, command) => {
    const { mint, amount, decimals, to } = options
    const spinner = ora('Minting token...').start()
    const {
      response: { signature },
    } = await metaplex.nfts().mint({
      nftOrSft: {
        address: new web3.PublicKey(mint),
        tokenStandard: TokenStandard.Fungible,
      },
      amount: token(amount, decimals),
      ...(to && { toOwner: new web3.PublicKey(to) }),
    })
    spinner.succeed(`Token minted: ${signature}`)
    logger.info(
      `Minted token ${mint} to ${
        to && metaplex.identity().publicKey.toBase58()
      }, signature: ${signature}`
    )
  })

program
  .command('upload-metadata')
  .description('Upload metadata to S3')
  .option('-n, --name <string>', 'The name of the token')
  .option('-s, --symbol <string>', 'The symbol of the token')
  .option('-d, --description <string>', 'The description of the token')
  .option('-i, --image <string>', 'The uri of token avatar image')
  .action(async (options, command) => {
    const { name, symbol, description, image } = options
    const spinner = ora('Uploading metadata...').start()
    const { uri } = await metaplex.nfts().uploadMetadata({
      name,
      symbol,
      description,
      image,
    })
    spinner.succeed(`Metadata uploaded: ${uri}`)
    logger.info(`Uploaded metadata: ${uri}`)
  })

program.parse(process.argv)
