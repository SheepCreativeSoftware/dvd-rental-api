import type session from 'express-session';
import { TypeormStore } from 'typeorm-store-typeormfix';
import { dataSource } from '../database/dataSource';
import { Session } from '../database/entity/Session';

const getSessionCookieConfig = (): session.SessionOptions => {
	if (typeof process.env.SESSION_SECRET === 'undefined') {
		throw new Error('Missing Session Secret');
	}

	const repository = dataSource.getRepository(Session);

	const sessionCookie: session.SessionOptions = {
		cookie: {
			httpOnly: true,
			maxAge: 10 * 60 * 1000,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production',
		},
		resave: false,
		rolling: true,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		store: new TypeormStore({ repository }),
	};

	return sessionCookie;
};

export { getSessionCookieConfig };
