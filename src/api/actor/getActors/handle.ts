import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';

const getActors = (): Handler => {
	return async (_req, res) => {
		try {
			const actors = await dataSource.getRepository(Actor).find();
			res.json(actors);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getActors };
