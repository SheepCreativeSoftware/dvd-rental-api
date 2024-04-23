import type { Handler } from 'express';
import { RequestParamValidator } from './requestValidator';
import { ActorRepository } from '../../../database/repository/ActorRepository';

const getActorById = (): Handler => {
	return async (req, res, next) => {
		try {
			const { id } = RequestParamValidator.parse(req.params);

			const actor = await ActorRepository.findById(id);

			return res.status(200).send(actor);
		} catch (error) {
			next(error);
		}
	};
};

export { getActorById };
