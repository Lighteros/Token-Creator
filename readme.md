# A simple CLI tool for creating tokens with metadata on solana

## Prerequisites

1. node >= 18
2. pnpm >= 8

## How to

1. Clone the repo
2. Install packages `pnpm install`
3. Run the command

```
pnpm dev create-token -n EBK Token -s EBK -u https://ebk-file-storage-bucket.s3.us-east-2.amazonaws.com/metadata.json -d 9
```

```
pnpm dev mint-token -m 7TS2ygkjKjo4FurJpB2qSbKQGpFGu5Yf2mCATuMKLRFj -a 1000000 -d 9
```

## Commands

1. Create Token [create-token]

- pnpm dev create-token <option> <value>
- pnpm dev mint-token <option> <value>
