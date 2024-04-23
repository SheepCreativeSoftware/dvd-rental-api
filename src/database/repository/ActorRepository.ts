import type { ActorBySearchDto } from '../../api/actor/getActors/requestValidator';
import { Actor } from '../entity/Actor';
import { dataSource } from '../dataSource';
import { NotFoundException } from '../../scripts/customErrors';
import { ILike } from 'typeorm';

const ActorRepository = dataSource.getRepository(Actor).extend({
	async findById(id: number): Promise<Actor> {
		const actor = await this.findOneBy({ actorId: id });

		if (actor == null) {
			throw new NotFoundException();
		}

		return actor;
	},

	async findAll(): Promise<Actor[]> {
		const actors = await this.find();

		if (actors.length === 0) {
			throw new NotFoundException();
		}

		return actors;
	},

	async findBySearch({ search }: ActorBySearchDto): Promise<Actor[]> {
		const actors = await this.find({
			where: [
				{
					firstName: ILike(`%${search}%`),
				},
				{
					lastName: ILike(`%${search}%`),
				},
			],
		});

		if (actors.length === 0) {
			throw new NotFoundException();
		}

		return actors;
	},
});

export { ActorRepository };
