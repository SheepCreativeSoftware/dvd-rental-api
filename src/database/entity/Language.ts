import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Update } from './base/Update';
import { Film } from './Film';

@Entity('language')
class Language extends Update {
	@PrimaryGeneratedColumn({
		name: 'language_id',
		type: 'integer',
	})
	languageId: number;

	@Column({
		name: 'name',
		type: 'character',
		length: 20,
	})
	name: string;

	@OneToMany(
		() => Film,
		film => film.language,
	)
	films: Film[];
}

export { Language };
