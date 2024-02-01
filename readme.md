# A simple CLI tool for creating tokens with metadata on solana

## Prerequisites

1. node >= 18
2. pnpm >= 8

## How to

1. Clone the repo
2. Install packages `pnpm install`
3. Create .env file
4. Run the command

```
pnpm dev create-token -n EBK Token -s EBK -u https://ebk-file-storage-bucket.s3.us-east-2.amazonaws.com/metadata.json -d 9
```

```
pnpm dev mint-token -m 7TS2ygkjKjo4FurJpB2qSbKQGpFGu5Yf2mCATuMKLRFj -a 1000000 -d 9
```

```
pnpm dev upload-metadata -n EBK Token -s EBK -d This is EBK Token -i https://ebk-file-storage-bucket.s3.us-east-2.amazonaws.com/DALL%C2%B7E+2024-01-16+10.50.01+-+A+vibrant+and+psychedelic+representation+of+Bitcoin%2C+featuring+swirling+colors+and+surreal+imagery%2C+blending+the+concept+of+digital+currency+with+a+dr.png
```

## Commands

1. Create Token [create-token]

- pnpm dev upload-metadata <option> <value>
- pnpm dev create-token <option> <value>
- pnpm dev mint-token <option> <value>
