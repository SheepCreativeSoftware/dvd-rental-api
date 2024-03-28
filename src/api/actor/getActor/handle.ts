import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

const getActorParams = zod.object({
	id: zod.string(),
});

const getActor = (): Handler => {
	return async (req, res) => {
		try {
			const params = getActorParams.parse(req.params);
			const results = await dataSource.getRepository(Actor).findOneBy({
				actorId: Number(params.id),
			});
			if (results == null) {
				throw new Error('Unknown Actor');
			}
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getActor };
