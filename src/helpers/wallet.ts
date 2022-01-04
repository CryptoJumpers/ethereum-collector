import { BigNumber as BN } from 'ethers';
import { WalletI } from '../interfaces';
import utils from '../utils';

const countBalances = async (wallets: Array<WalletI>) => {
	const balances = await Promise.all(wallets.map((wallet: WalletI) => utils.ethers.getBalance(wallet)));
	return balances.reduce((acc, balance) => acc.add(BN.from(balance)), BN.from(0));
};

const checkNetProfit = async (wallet: WalletI, gasPrice: BN) => {
	const totalFees = gasPrice.mul(BN.from(21000));
	const balance = await utils.ethers.getBalance(wallet);
	const netProfit = BN.from(balance).sub(totalFees);
	return netProfit.gt(BN.from(0)) ? wallet : null;
};

const loadNonces = (eligibleWallets: WalletI[]) => {
	return Promise.all(
		eligibleWallets.map(async wallet => {
			const nonce = await utils.ethers.getNonce(wallet.address);
			return { ...wallet, nonce };
		})
	);
};

export default {
    countBalances,
    checkNetProfit,
    loadNonces,
}