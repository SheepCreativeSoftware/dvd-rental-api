import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Person } from '../base/Person';
import { Address } from '../Address';
import { Store } from '../Store';

@Entity()
class User extends Person {
	@OneToOne(() => Address)
	@JoinColumn({
		name: 'address_id',
		referencedColumnName: 'addressId',
		foreignKeyConstraintName: 'user_address_id_fkey',
	})
	address: Address;

	@Column({
		name: 'email',
		type: 'character varying',
		length: 50,
		nullable: true,
		unique: true,
	})
	email: string;

	@OneToOne(() => Store)
	@JoinColumn({
		name: 'store_id',
		referencedColumnName: 'storeId',
		foreignKeyConstraintName: 'user_store_id_fkey',
	})
	store: Store;
}

export { User };
