import { z as zod } from 'zod';

const RequestBodyValidator = zod.object({
	firstName: zod.string().max(45).optional(),
	lastName: zod.string().max(45).optional(),
});

export { RequestBodyValidator };
