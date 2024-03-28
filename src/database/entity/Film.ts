import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Update } from './base/Update';
import { Language } from './Language';

export enum MpaaRating {
	RatedG = 'G',
	RatedPg = 'PG',
	RatedPg13 = 'PG-13',
	RatedR = 'R',
	RatedNc17 = 'NC-17',
}

@Entity('film')
class Film extends Update {
	@PrimaryGeneratedColumn({
		name: 'film_id',
		type: 'integer',
	})
	filmId: number;

	@Column({
		name: 'title',
		type: 'character varying',
		length: 255,
	})
	title: string;

	@Column({
		name: 'description',
		type: 'text',
		nullable: true,
	})
	description: string;

	@Column({
		name: 'release_year',
		type: 'integer',
		width: 4,
		nullable: true,
	})
	releaseYear: Date;

	@ManyToOne(
		() => Language,
		language => language.films,
	)
	@JoinColumn({
		name: 'language_id',
		referencedColumnName: 'languageId',
		foreignKeyConstraintName: 'film_language_id_fkey',
	})
	language: Language;

	@Column({
		name: 'rental_duration',
		type: 'smallint',
		default: 3,
	})
	rentalDuration: number;

	@Column({
		name: 'rental_rate',
		type: 'numeric',
		precision: 4,
		scale: 2,
		default: 4.99,
	})
	rentalRate: number;

	@Column({
		name: 'length',
		type: 'smallint',
		nullable: true,
	})
	length: number;

	@Column({
		name: 'replacement_cost',
		type: 'numeric',
		precision: 5,
		scale: 2,
		default: 19.99,
	})
	replacementCost: number;

	@Column({
		name: 'rating',
		type: 'enum',
		enum: MpaaRating,
		default: MpaaRating.RatedG,
	})
	rating: MpaaRating;

	@Column('simple-array', {
		name: 'special_features',
		array: true,
		nullable: true,
	})
	specialFeatures: string[];

	@Column({
		name: 'fulltext',
		type: 'tsvector',
	})
	fulltext: string;
}

export { Film };
