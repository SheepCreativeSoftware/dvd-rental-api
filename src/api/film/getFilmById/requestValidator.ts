import { z as zod } from 'zod';
import { stringToNumber } from '../../../scripts/validatorTransformer';

const RequestParamValidator = zod.object({
	id: zod.string().transform(stringToNumber),
});

export { RequestParamValidator };
