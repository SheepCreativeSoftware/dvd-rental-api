import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

const getActorParams = zod.number();

const getActor = (): Handler => {
	return async (req, res) => {
		try {
			const id = getActorParams.parse(Number(req.params.id));
			const result = await dataSource.getRepository(Actor).findOneBy({
				actorId: id,
			});
			if (result == null) {
				throw new Error('Unknown Actor');
			}
			return res.send(result);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getActor };
