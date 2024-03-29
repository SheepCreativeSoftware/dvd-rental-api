import type { Handler } from 'express';
import { Film } from '../../../database/entity/Film';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';
import { ArrayContains, ILike } from 'typeorm';

const getFilmsBySearchQuery = zod
	.object({
		title: zod.string().min(3),
		description: zod.string().min(3),
		language: zod.string().min(3),
		specialFeatures: zod.string().min(3),
	})
	.partial();

const getFilmsBySearch = (): Handler => {
	return async (req, res) => {
		try {
			const query = getFilmsBySearchQuery.parse(req.query);

			if (!Object.keys(query).length) {
				throw new Error('Missing at least one query parameter');
			}

			const results = await dataSource.getRepository(Film).find({
				where: {
					title: query.title && ILike(`%${query.title}%`),
					description: query.description && ILike(`%${query.description}%`),
					language: { name: query.language && ILike(`%${query.language}%`) },
					specialFeatures:
						query.specialFeatures && ArrayContains([query.specialFeatures]),
				},
				select: {
					filmId: true,
					description: true,
					releaseYear: true,
					title: true,
					length: true,
					rating: true,
					specialFeatures: true,
					language: {
						name: true,
					},
				},
				take: 100,
				relations: { language: true },
			});

			if (!results.length) {
				return res.send({ message: 'Nothing found' });
			}
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getFilmsBySearch };
