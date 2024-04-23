import type { Handler } from 'express';
import { RequestParamValidator } from './requestValidator';
import { FilmRepository } from '../../../database/repository/FilmRepository';

const getFilmById = (): Handler => {
	return async (req, res, next) => {
		try {
			const { id } = RequestParamValidator.parse(req.params);

			const film = await FilmRepository.findById(id);

			return res.status(200).send(film);
		} catch (error) {
			next(error);
		}
	};
};

export { getFilmById };
