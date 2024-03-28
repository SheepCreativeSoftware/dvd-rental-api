import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './base/User';

@Entity('customer')
class Customer extends User {
	@PrimaryGeneratedColumn({
		name: 'customer_id',
		type: 'integer',
	})
	customerId: number;

	@Column({
		name: 'activebool',
		type: 'boolean',
		default: true,
	})
	activeBool: boolean;

	@CreateDateColumn({
		name: 'create_date',
		type: 'date',
	})
	createDate: Date;

	@Column({
		name: 'active',
		type: 'integer',
		nullable: true,
	})
	active: number;
}

export { Customer };
