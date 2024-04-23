import type { ErrorRequestHandler } from 'express';
import { buntstift } from 'buntstift';

const logOnError: ErrorRequestHandler = (err, _req, _res, next) => {
	if (err instanceof Error) {
		buntstift.error(`${err.name}: ${err.message}`);
		if (err.stack) {
			buntstift.error(err.stack);
		}
		if (err.cause) {
			buntstift.error(JSON.stringify(err.cause));
		}
	}
	next(err);
};

export { logOnError };
