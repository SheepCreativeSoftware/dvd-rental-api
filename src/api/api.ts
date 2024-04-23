import { clientErrorHandler, errorHandler, notFoundHandler } from '../middleware/errorHandlers';
import { actorRouter } from './actor/router';
import { csrfTokenRouter } from './csrf-token/router';
import { filmsRouter } from './film/router';
import { getCsrfProtection } from '../config/csrfConfig';
import { getSessionCookieConfig } from '../config/sessionCookie';
import { logOnError } from '../middleware/errorLogger';
import express from 'express';
import session from 'express-session';

const getApi = () => {
	const app = express();

	// Setup middlewares
	app.use(express.json());

	if (process.env.NODE_ENV === 'production') {
		// Trust first proxy (ngnix)
		app.set('trust proxy', true);
	}

	app.use(session(getSessionCookieConfig()));

	// Register routes
	// Public routes
	// TODO: Login route

	// TODO: Get CSRF route
	app.use(getCsrfProtection());
	app.use('/api/v1', csrfTokenRouter);

	// TODO: Protect existing routes with csrf

	// Restricted routes
	app.use('/api/v1', actorRouter);
	app.use('/api/v1', filmsRouter);

	// Handle errors
	app.use(logOnError);
	app.use(notFoundHandler);
	app.use(clientErrorHandler);
	app.use(errorHandler);

	return app;
};

export { getApi };
