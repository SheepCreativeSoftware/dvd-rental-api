import type { Handler } from 'express';
import { RequestBodyValidator, RequestParamValidator } from './requestValidator';
import { ActorRepository } from '../../../database/repository/ActorRepository';

const updateActor = (): Handler => {
	return async (req, res, next) => {
		try {
			const { id } = RequestParamValidator.parse(req.params);
			const actor = await ActorRepository.findById(id);

			const requestBody = RequestBodyValidator.parse(req.body);
			ActorRepository.merge(actor, requestBody);
			const result = await ActorRepository.save(actor);

			return res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	};
};

export { updateActor };
