import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './City';
import { Update } from './base/Update';

@Entity('country')
class Country extends Update {
	@PrimaryGeneratedColumn({
		name: 'country_id',
		type: 'integer',
	})
	countryId: number;

	@Column({
		name: 'country',
		type: 'character varying',
		length: 50,
	})
	country: string;

	@OneToMany(
		() => City,
		city => city.country,
	)
	cities: City[];
}

export { Country };
