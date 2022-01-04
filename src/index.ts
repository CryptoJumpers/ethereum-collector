import { Wallet } from 'ethers';
import { WalletI, LoadedWalletI } from './interfaces';
import helper from './helpers';
import utils from './utils';
import path from 'path';

(async () => {
	const provider = utils.ethers.connect();
	const wallets = utils.utils.readWallets(path.join(__dirname, '../../config/wallets.txt'));

	const gasPrice = await utils.ethers.getGasPrice();
	utils.logger.log(`Current Gas Price: ${utils.ethers.formatGwei(gasPrice)}`, 'info');

	const countBalances = await helper.wallet.countBalances(wallets);
	utils.logger.log(`Total balance found: ${utils.ethers.formatEther(countBalances)}`, 'success');

	const netProfits = await Promise.all(wallets.map(el => helper.wallet.checkNetProfit(el, gasPrice)));
	const eligibleWallets = netProfits.filter(el => el) as WalletI[];
	utils.logger.log(`Eligible wallets: ${eligibleWallets.length}`, 'info');

	const loadedEligibleWallets = await helper.wallet.loadNonces(eligibleWallets);
	loadedEligibleWallets.forEach(async (w: LoadedWalletI) => {
		const walletPrivateKey = new Wallet(w.privateKey);
		const wallet = walletPrivateKey.connect(provider);
		const txObj = helper.tx.createTx(w, gasPrice);
		// txHelper.printTxInfo(txObj);
		const tx = await wallet.sendTransaction(txObj);
		utils.logger.log(`Sent ${utils.ethers.formatEther(txObj.value).toString()} from ${wallet.address}`);
		utils.logger.log(`Transaction hash: https://etherscan.io/tx/${tx.hash}`, 'info');
	});
})();
