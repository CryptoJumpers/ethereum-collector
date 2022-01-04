import { BigNumber as BN } from 'ethers';

export interface GenericObject {
	[key: string]: string;
}

export interface WalletI {
	address: string;
	privateKey: string;
	balance: string;
}

export interface LoadedWalletI {
	address: string;
	privateKey: string;
	balance: string;
	nonce: number;
}

export interface TransactionI {
	to: string;
	from: string;
	nonce: number;
	value: BN;
	gasLimit: BN;
	maxFeePerGas: BN;
	maxPriorityFeePerGas: BN;
}
