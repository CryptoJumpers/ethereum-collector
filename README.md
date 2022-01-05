# Ethereum Wallet Collector

Recover $ETH from multiple wallets to one.

## Getting Started

The script will send to the receiver the whole eth balance found in each wallet.

1. Open "config" folder and edit the "config.json" file. (Both MaxFee and MaxPriorityFee are in GWEI.)

2. Load your wallets into wallets.txt (format address:privateKey)

If no **maxFee** is set the script will use the default values pulled from the blockchain.

If no **maxPriorityFee** is set the script will use 2 GWEI.

# Installation and Usage

Install the dependencies.
```js
yarn
````

Run the script.
```js
yarn start
```
