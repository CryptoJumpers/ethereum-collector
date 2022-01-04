import { BigNumber as BN } from 'ethers';
import { LoadedWalletI, TransactionI } from '../interfaces';
import utils from '../utils';
import config from '../../config/config.json';

const createTx = (wallet: LoadedWalletI, gasPrice: BN) => {
	const gasLimit = BN.from(config.tx.gasLimit);
	const value = BN.from(wallet.balance).sub(gasPrice.mul(gasLimit)); // subtract gas fee from balance
	const maxFeePerGas = config.tx.maxFee ? BN.from(utils.web3.fromGweiToWei(config.tx.maxFee)) : gasPrice;
	const maxPriorityFeePerGas = config.tx.maxPriorityFee
		? BN.from(utils.web3.fromGweiToWei(config.tx.maxPriorityFee))
		: BN.from(2000000000);
	return {
		to: config.receiverAddress,
		from: wallet.address,
		nonce: wallet.nonce,
		value,
		gasLimit,
		maxFeePerGas,
		maxPriorityFeePerGas,
	};
};

const printTxInfo = (txObj: TransactionI) => {
	utils.logger.log(`Sender: ${txObj.from}`);
	utils.logger.log(`Value: ${utils.ethers.formatEther(txObj.value).toString()}`);
	utils.logger.log(`Nonce: ${txObj.nonce}`);
	utils.logger.log(`Receiver: ${txObj.to}`);
	// utils.logger.log(`Gas Price: ${utils.ethers.formatGwei(txObj.gasPrice)}`);
	utils.logger.log(`Gas Limit: ${txObj.gasLimit.toString()}`);
	utils.logger.log(`Max Fee Per Gas: ${txObj.maxFeePerGas.toString()}`);
	utils.logger.log(`Max Priority Fee Per Gas: ${txObj.maxPriorityFeePerGas.toString()}`);
};

export default {
	createTx,
    printTxInfo,
};