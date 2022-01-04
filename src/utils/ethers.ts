import { ethers, BigNumber } from 'ethers';
import { WalletI, LoadedWalletI } from '../interfaces';
import config from '../../config/config.json';
const provider = new ethers.providers.JsonRpcProvider(config.rpcProvider.http);

const connect = () => {
	return provider;
};

const getBalance = async (wallet: WalletI) => {
	if (!wallet.balance) {
		const balance = await provider.getBalance(wallet.address);
		wallet.balance = BigNumber.from(balance._hex).toString();
	}
	return wallet.balance;
};

const getGasPrice = async () => {
	return provider.getGasPrice();
}

const formatEther = (wei: BigNumber | string) => {
	return ethers.utils.formatEther(wei);
};

const formatGwei = (wei: BigNumber) => {
	return ethers.utils.formatUnits(wei, 'gwei');
};

const getNonce = (address: string) => {
	return provider.getTransactionCount(address);
};

const loadWallets = async (wallet: WalletI) => {
	const nonce = await provider.getTransactionCount(wallet.address);
	const updatedWallet: LoadedWalletI = { ...wallet, nonce };
	return updatedWallet;
};

export default {
	connect,
	getBalance,
	getGasPrice,
	formatEther,
	formatGwei,
	getNonce,
	loadWallets,
};
