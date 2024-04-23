import type { Film } from '../../../database/entity/Film';
import type { Handler } from 'express';
import { FilmRepository } from '../../../database/repository/FilmRepository';
import { RequestQueryValidator } from './requestValidator';

const getFilms = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestQueryValidator.parse(req.query);

			const films: Film[] = [];

			// If search parameters are set
			if (Object.keys(requestQuery).length) {
				films.push(...(await FilmRepository.findBySearch(requestQuery)));
			} else {
				films.push(...(await FilmRepository.findAll()));
			}

			return res.status(200).send(films);
		} catch (error) {
			next(error);
		}
	};
};

export { getFilms };
