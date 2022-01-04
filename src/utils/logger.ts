import dayjs from 'dayjs';
import { GenericObject } from '../interfaces';

const colors: GenericObject = {
	info: '\x1b[34m',
	error: '\x1b[31m',
	success: '\x1b[32m',
	yellow: '\x1b[33m',
	white: '\x1b[37m',
	cyan: '\x1b[36m',
	reset: '\x1b[0m',
};

const log = (message: string | number | GenericObject, color = 'reset', inline = false) => {
	const timestamp = dayjs().format('HH:mm:ss.SSS');
	const str = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
	const end = inline ? '\r' : '\n';
	process.stdout.write(`${colors[color]}${timestamp} - ${str}${end}${colors.reset}`);
};

export default {
	log,
};
