import { Column, Entity } from 'typeorm';
import { Update } from './Update';

@Entity()
class Person extends Update {
	@Column({
		name: 'first_name',
		type: 'character varying',
		length: 45,
	})
	firstName: string;

	@Column({
		name: 'last_name',
		type: 'character varying',
		length: 45,
	})
	lastName: string;
}

export { Person };
