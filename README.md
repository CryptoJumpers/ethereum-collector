# Ethereum Wallet Emptier

Recover $ETH from multiple wallets to one.

## Getting Started

The script will send to the receiver the whole eth balance found in each wallet.

1. Open "config" folder and edit the "config.json" file.

2. Load your wallets into wallets.txt (format address:privateKey)

Both MaxFee and MaxPriorityFee are in GWEI.

If no MaxFee is set the script will use the default values from chain.

If no MaxPriorityFee is set the script will use 2 GWEI.

```js
yarn
````
```js
yarn start
```
