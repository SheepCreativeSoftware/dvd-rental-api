import type { Handler } from 'express';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { Film } from '../../../database/entity/Film';
import { z as zod } from 'zod';

const getFilmParams = zod.number();

const getFilm = (): Handler => {
	return async (req, res) => {
		try {
			const id = getFilmParams.parse(Number(req.params.id));
			const result = await dataSource.getRepository(Film).findOne({
				where: {
					filmId: id,
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
				relations: { language: true },
			});

			if (result == null) {
				throw new Error('Unknown Film');
			}
			return res.send(result);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getFilm };
