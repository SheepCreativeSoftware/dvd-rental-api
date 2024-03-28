import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { Staff } from './Staff';
import { Inventory } from './Inventory';
import { Update } from './base/Update';

@Entity('rental')
class Rental extends Update {
	@PrimaryGeneratedColumn({
		name: 'rental_id',
		type: 'integer',
	})
	rentalId: number;

	@Column({
		name: 'rental_date',
		type: 'timestamp without time zone',
		nullable: false,
	})
	rentalDate: Date;

	@ManyToOne(
		() => Inventory,
		inventory => inventory.inventoryId,
	)
	@JoinColumn({
		name: 'inventory_id',
		foreignKeyConstraintName: 'rental_inventory_id_fkey',
	})
	inventory: Inventory;

	@ManyToOne(
		() => Customer,
		customer => customer.customerId,
	)
	@JoinColumn({
		name: 'customer_id',
		foreignKeyConstraintName: 'rental_customer_id_fkey',
	})
	customer: Customer;

	@Column({
		name: 'return_date',
		type: 'timestamp without time zone',
		nullable: true,
	})
	returnDate: Date;

	@ManyToOne(
		() => Staff,
		staff => staff.staffId,
	)
	@JoinColumn({
		name: 'staff_id',
		foreignKeyConstraintName: 'payment_staff_id_fkey',
	})
	staff: Staff;
}

export { Rental };
