import type { Handler } from 'express';
import { ActorRepository } from '../../../database/repository/ActorRepository';
import { NotFoundException } from '../../../scripts/customErrors';
import { RequestParamValidator } from './requestValidator';

const deleteActor = (): Handler => {
	return async (req, res, next) => {
		try {
			const { id } = RequestParamValidator.parse(req.params);

			const result = await ActorRepository.delete(id);

			if (result.affected === 0) {
				throw new NotFoundException(`Task with ID: '${id}' was not found`);
			}

			return res.status(200).send();
		} catch (error) {
			next(error);
		}
	};
};

export { deleteActor };
