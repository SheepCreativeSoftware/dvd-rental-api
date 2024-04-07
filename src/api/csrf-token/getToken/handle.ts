import type { Handler } from 'express';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';

const getCsrfToken = (): Handler => {
	return (req, res, next) => {
		try {
			if (typeof req.csrfToken !== 'function') {
				throw new Error('Internal Error', { cause: 'Missing CSRF middleware function' });
			}
			const csrfToken = req.csrfToken();
			return res.send({ csrfToken });
		} catch (error) {
			if (error instanceof Error && error.message === 'Internal Error') {
				return next(error);
			}

			return errorResponseHandler(res, error);
		}
	};
};

export { getCsrfToken };
