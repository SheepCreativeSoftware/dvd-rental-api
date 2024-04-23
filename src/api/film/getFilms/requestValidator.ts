import { z as zod } from 'zod';

const RequestQueryValidator = zod
	.object({
		title: zod.string().min(3),
		description: zod.string().min(3),
		language: zod.string().min(3),
		specialFeatures: zod.string().min(3),
	})
	.partial();

type FilmsBySearchDto = zod.infer<typeof RequestQueryValidator>;

export type { FilmsBySearchDto };
export { RequestQueryValidator };
