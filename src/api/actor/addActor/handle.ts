import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

const addActorBody = zod.object({
	firstName: zod.string().max(45),
	lastName: zod.string().max(45),
});

const addActor = (): Handler => {
	return async (req, res) => {
		try {
			const response = addActorBody.parse(req.body);
			const actor = await dataSource.getRepository(Actor).create(response);
			const results = await dataSource.getRepository(Actor).save(actor);
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { addActor };
