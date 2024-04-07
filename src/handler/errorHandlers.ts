// eslint-disable-next-line no-shadow
import type { NextFunction, Request, Response } from 'express';
import { buntstift } from 'buntstift';

const logOnError = (err: unknown, _req: Request, _res: Response, next: NextFunction) => {
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

// Handle unknown routes error
const notFoundHandler = (_req: Request, res: Response) => {
	res.status(404).send({ message: 'Not Found' });
};

// Handle Errors in middlewares
const clientErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		switch (err.name) {
			case 'Bad Request':
				return res.status(400).send({ message: 'Bad Request' });
			case 'Forbidden':
				return res.status(403).send({ message: 'Forbidden' });
		}
	}
	return next(err);
};

// Handle unexpected errors
const errorHandler = (_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
	res.status(500).send({ message: 'Internal Server Error' });
};

export { errorHandler, clientErrorHandler, logOnError, notFoundHandler };
