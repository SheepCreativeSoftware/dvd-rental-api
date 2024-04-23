import { z as zod } from 'zod';
import { stringToNumber } from '../../../scripts/validatorTransformer';

const RequestParamValidator = zod.object({
	id: zod.string().transform(stringToNumber),
});

const RequestBodyValidator = zod.object({
	firstName: zod.string().max(45).optional(),
	lastName: zod.string().max(45).optional(),
});

export { RequestParamValidator, RequestBodyValidator };
