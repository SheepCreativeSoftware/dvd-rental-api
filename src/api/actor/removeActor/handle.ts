import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

const removeActorParams = zod.object({
	id: zod.string(),
});

const removeActor = (): Handler => {
	return async (req, res) => {
		try {
			const params = removeActorParams.parse(req.params);
			const results = await dataSource.getRepository(Actor).delete(params.id);
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { removeActor };
