import type { Handler } from 'express';
import { RequestBodyValidator } from './requestValidator';
import { ActorRepository } from '../../../database/repository/ActorRepository';

const createActor = (): Handler => {
	return async (req, res, next) => {
		try {
			const response = RequestBodyValidator.parse(req.body);
			const actor = ActorRepository.create(response);

			const result = await ActorRepository.save(actor);

			return res.status(201).send(result);
		} catch (error) {
			next(error);
		}
	};
};

export { createActor };
