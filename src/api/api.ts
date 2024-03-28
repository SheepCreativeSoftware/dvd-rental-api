import express from 'express';
import { clientErrorHandler, errorHandler, notFoundHandler } from '../handler/errorHandlers';
import { actorRouter } from './actor/router';

const getApi = () => {
	const app = express();

	app.use(express.json());

	// register routes
	app.use('/api/v1', actorRouter);

	// Handle errors
	app.use(notFoundHandler);
	app.use(clientErrorHandler);
	app.use(errorHandler);

	return app;
};

export { getApi };
