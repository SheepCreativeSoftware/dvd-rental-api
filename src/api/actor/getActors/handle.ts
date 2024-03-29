import type { Handler } from 'express';
import { Actor } from '../../../database/entity/Actor';
import { dataSource } from '../../../database/dataSource';
import { errorResponseHandler } from '../../../handler/errorResponseHandler';
import { z as zod } from 'zod';

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

const getActorsByPropertyQuery = zod
	.object({
		id: zod.string().min(1),
		firstName: zod.string().min(1),
		lastName: zod.string().min(1),
	})
	.partial();

const getActorsByProperty = (): Handler => {
	return async (req, res) => {
		try {
			const query = getActorsByPropertyQuery.parse(req.query);
			if (!Object.keys(query).length) {
				throw new Error('Missing at least one query parameter');
			}

			const results = await dataSource.getRepository(Actor).find({
				where: {
					actorId: Number(query.id) || undefined,
					firstName: query.firstName,
					lastName: query.lastName,
				},
			});
			if (!results.length) {
				return res.send({ message: 'Nothing found' });
			}
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

const getActorsBySearchQuery = zod.object({
	name: zod.string().min(1),
});

const getActorsBySearch = (): Handler => {
	return async (req, res) => {
		try {
			const { name } = getActorsBySearchQuery.parse(req.query);

			const results = await dataSource
				.getRepository(Actor)
				.createQueryBuilder('actor')
				.where("actor.firstName || ' ' || actor.lastName ILIKE :fullName", {
					fullName: `%${name}%`,
				})
				.getMany();

			if (!results.length) {
				return res.send({ message: 'Nothing found' });
			}
			return res.send(results);
		} catch (error) {
			errorResponseHandler(res, error);
		}
	};
};

export { getActors, getActorsByProperty, getActorsBySearch };
