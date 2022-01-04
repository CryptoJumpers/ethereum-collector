import fs from 'fs';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const readWallets = (path: string) => {
	const data = fs.readFileSync(path, 'utf-8').trim().split('\n');
	return data.map(line => {
		const [address, privateKey] = line.split(':');
		return { address, privateKey, balance: '' };
	});
};

export default {
	sleep,
	readWallets,
};
