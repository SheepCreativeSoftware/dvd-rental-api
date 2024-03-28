import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './Country';
import { Address } from './Address';
import { Update } from './base/Update';

@Entity('city')
class City extends Update {
	@PrimaryGeneratedColumn({
		name: 'city_id',
		type: 'integer',
	})
	cityId: number;

	@Column({
		name: 'city',
		type: 'character varying',
		length: 50,
	})
	city: string;

	@ManyToOne(
		() => Country,
		country => country.cities,
	)
	@JoinColumn({
		name: 'country_id',
		referencedColumnName: 'countryId',
		foreignKeyConstraintName: 'fk_city',
	})
	country: City;

	@OneToMany(
		() => Address,
		address => address.city,
	)
	addresses: Address[];
}

export { City };
