import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './base/Person';

@Entity('actor')
class Actor extends Person {
	@PrimaryGeneratedColumn({
		name: 'actor_id',
		type: 'integer',
	})
	actorId: number;
}

export { Actor };
