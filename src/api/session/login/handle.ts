import type { Handler } from 'express';
import { z as zod } from 'zod';
import { dataSource } from '../../../database/dataSource';
import { Staff } from '../../../database/entity/Staff';

const getLoginBody = zod.object({
	username: zod.string().min(1).max(50),
	password: zod.string().min(1).max(40),
});

const loginUser = (): Handler => {
	return async (req, res, next) => {
		const { password, username } = getLoginBody.parse(req.body);
		await dataSource.getRepository(Staff).findOne({
			where: {
				username,
				active: true,
			},
		});
	};
};

export { loginUser };
