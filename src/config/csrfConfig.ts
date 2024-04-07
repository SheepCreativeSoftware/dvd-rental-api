import { csrfSync } from 'csrf-sync';

const getCsrfProtection = () => {
	if (typeof process.env.CSRF_SECRET === 'undefined') {
		throw new Error('Missing CSRF Secret');
	}

	const { csrfSynchronisedProtection } = csrfSync({
		ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
		getTokenFromState: req => {
			return req.session.csrfToken;
		},
		getTokenFromRequest: req => {
			const csrfToken = req.headers['x-csrf-token'];
			if (typeof csrfToken !== 'string') {
				return null;
			}
			return csrfToken;
		},
		storeTokenInState: (req, token) => {
			req.session.csrfToken = token;
		},
		size: 128,
	});

	return csrfSynchronisedProtection;
};

export { getCsrfProtection };
