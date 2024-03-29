// eslint-disable-next-line no-shadow
import type { NextFunction, Request, Response } from 'express';
import { buntstift } from 'buntstift';

// Handle unknown routes error
const notFoundHandler = (_req: Request, res: Response) => {
	res.status(404).send('Not Found');
};

// Handle Errors in middlewares
const clientErrorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		buntstift.error(`${err.name}: ${err.message}`);
	}
	if (err.stack) {
		buntstift.error(err.stack);
	}
	if (err.name === 'Forbidden') {
		return res.status(403).send('Forbidden');
	}
	return next(err);
};

// Handle unexpected errors
const errorHandler = (err: Error, _req: Request, res: Response) => {
	if (err instanceof Error) {
		buntstift.error(`${err.name}: ${err.message}`);
	}
	if (err.stack) {
		buntstift.error(err.stack);
	}
	res.status(400).send('Bad Request');
};

export { errorHandler, clientErrorHandler, notFoundHandler };
