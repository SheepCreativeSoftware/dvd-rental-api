import { z as zod } from 'zod';

const RequestQueryValidator = zod
	.object({
		search: zod.string().min(1),
	})
	.partial();

type ActorBySearchDto = zod.infer<typeof RequestQueryValidator>;

export type { ActorBySearchDto };
export { RequestQueryValidator };
