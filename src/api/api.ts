import express from 'express';
import {
	clientErrorHandler,
	errorHandler,
	logOnError,
	notFoundHandler,
} from '../handler/errorHandlers';
import { actorRouter } from './actor/router';
import { filmsRouter } from './film/router';
import session from 'express-session';
import { getSessionCookieConfig } from '../config/sessionCookie';
import { csrfTokenRouter } from './csrf-token/router';
import { getCsrfProtection } from '../config/csrfConfig';

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
