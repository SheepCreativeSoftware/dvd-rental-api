import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './City';
import { Update } from './base/Update';

@Entity('address')
class Address extends Update {
	@PrimaryGeneratedColumn({
		name: 'address_id',
		type: 'integer',
	})
	addressId: number;

	@Column({
		name: 'address',
		type: 'character varying',
		length: 50,
	})
	address: string;

	@Column({
		name: 'address2',
		type: 'character varying',
		length: 50,
		nullable: true,
	})
	address2: string;

	@Column({
		name: 'district',
		type: 'character varying',
		length: 20,
	})
	district: string;

	@ManyToOne(
		() => City,
		city => city.addresses,
	)
	@JoinColumn({
		name: 'city_id',
		referencedColumnName: 'cityId',
		foreignKeyConstraintName: 'fk_address_city',
	})
	city: Address;

	@Column({
		name: 'postal_code',
		type: 'character varying',
		length: 10,
		nullable: true,
	})
	postalCode: string;

	@Column({
		name: 'phone',
		type: 'character varying',
		length: 20,
	})
	phone: string;
}

export { Address };
