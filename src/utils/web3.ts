import Web3 from 'web3';

const fromGweiToWei = (amount: string) => {
	return Web3.utils.toWei(amount, 'gwei');
};

export default {
	fromGweiToWei,
};
