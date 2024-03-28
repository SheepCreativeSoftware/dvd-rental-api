import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

const updateActorParams = zod.object({
	id: zod.string(),
});

const updateActorBody = zod.object({
	firstName: zod.string().max(45).optional(),
	lastName: zod.string().max(45).optional(),
});

const updateActor = (): Handler => {
	return async (req, res) => {
		try {
			const params = updateActorParams.parse(req.params);
			const actor = await dataSource.getRepository(Actor).findOneBy({
				actorId: Number(params.id),
			});
			if (actor == null) {
				throw new Error('Unknown Actor');
			}

			const response = updateActorBody.parse(req.body);
			dataSource.getRepository(Actor).merge(actor, response);
			const results = await dataSource.getRepository(Actor).save(actor);
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { updateActor };
