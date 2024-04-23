import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './Customer';
import { Staff } from './Staff';
import { Rental } from './Rental';

@Entity('payment')
class Payment {
	@PrimaryGeneratedColumn({
		name: 'payment_id',
		type: 'integer',
	})
	paymentId: number;

	@ManyToOne(
		() => Customer,
		customer => customer.customerId,
	)
	@JoinColumn({
		name: 'customer_id',
		foreignKeyConstraintName: 'payment_customer_id_fkey',
	})
	customer: Customer;

	@ManyToOne(
		() => Staff,
		staff => staff.staffId,
	)
	@JoinColumn({
		name: 'staff_id',
		foreignKeyConstraintName: 'payment_staff_id_fkey',
	})
	staff: Staff;

	@ManyToOne(
		() => Rental,
		rental => rental.rentalId,
	)
	@JoinColumn({
		name: 'rental_id',
		foreignKeyConstraintName: 'payment_rental_id_fkey',
	})
	rental: Rental;

	@Column({
		name: 'amount',
		type: 'numeric',
		precision: 5,
		scale: 2,
	})
	amount: number;

	@Column({
		name: 'payment_date',
		type: 'timestamp without time zone',
		nullable: false,
	})
	paymentDate: Date;
}

export { Payment };
