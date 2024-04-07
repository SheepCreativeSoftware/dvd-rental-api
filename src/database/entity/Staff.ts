import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './base/User';

@Entity('staff')
class Staff extends User {
	@PrimaryGeneratedColumn({
		name: 'staff_id',
		type: 'integer',
	})
	staffId: number;

	@Column({
		name: 'active',
		type: 'boolean',
	})
	active: boolean;

	@Column({
		name: 'username',
		type: 'character varying',
		length: 16,
		unique: true,
	})
	username: string;

	@Column({
		name: 'password',
		type: 'character varying',
		length: 40,
		nullable: true,
	})
	password: string;

	@Column({
		name: 'picture',
		type: 'bytea',
		nullable: true,
	})
	picture: Buffer;
}

export { Staff };
