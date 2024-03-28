import type { Response } from 'express';
import { ZodError } from 'zod';

const errorResponseHandler = (res: Response, error: unknown) => {
	if (error instanceof ZodError) {
		return res.status(400).json({ message: error.issues });
	}
	if (error instanceof Error) {
		return res.status(400).json({ message: error.message });
	}
};

export { errorResponseHandler };
