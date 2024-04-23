import type { RefinementCtx } from 'zod';
import { z as zod } from 'zod';

const stringToNumber = (value: string, context: RefinementCtx) => {
	const parsed = Number(value);

	if (Number.isNaN(parsed)) {
		context.addIssue({
			code: zod.ZodIssueCode.custom,
			message: 'Not a number',
		});

		return zod.NEVER;
	}

	return parsed;
};

export { stringToNumber };
