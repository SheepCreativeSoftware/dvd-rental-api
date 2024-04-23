import type { Actor } from '../../../database/entity/Actor';
import type { Handler } from 'express';
import { RequestQueryValidator } from './requestValidator';
import { ActorRepository } from '../../../database/repository/ActorRepository';

const getActors = (): Handler => {
	return async (req, res, next) => {
		try {
			const requestQuery = RequestQueryValidator.parse(req.query);

			const actors: Actor[] = [];
			if (Object.keys(requestQuery).length) {
				actors.push(...(await ActorRepository.findBySearch(requestQuery)));
			} else {
				actors.push(...(await ActorRepository.findAll()));
			}

			return res.status(200).send(actors);
		} catch (error) {
			next(error);
		}
	};
};

export { getActors };
