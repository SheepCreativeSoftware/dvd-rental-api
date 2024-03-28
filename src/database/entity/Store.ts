import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import { Staff } from './Staff';
import { Update } from './base/Update';

@Entity('store')
class Store extends Update {
	@PrimaryGeneratedColumn({
		name: 'store_id',
		type: 'integer',
	})
	storeId: number;

	@OneToOne(() => Staff)
	@JoinColumn({
		name: 'manager_staff_id',
		referencedColumnName: 'staffId',
		foreignKeyConstraintName: 'store_manager_staff_id_fkey',
	})
	managerStaff: Staff;

	@OneToOne(() => Address)
	@JoinColumn({
		name: 'address_id',
		referencedColumnName: 'addressId',
		foreignKeyConstraintName: 'store_address_id_fkey',
	})
	address: Address;
}

export { Store };
