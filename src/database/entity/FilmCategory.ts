import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Update } from './base/Update';
import { Film } from './Film';
import { Category } from './Category';

@Entity('film_category')
class FilmCategory extends Update {
	@PrimaryColumn({
		name: 'category_id',
		type: 'integer',
	})
	categoryId: number;

	@PrimaryColumn({
		name: 'film_id',
		type: 'integer',
	})
	filmId: number;

	@ManyToOne(
		() => Film,
		film => film.filmId,
	)
	@JoinColumn({
		name: 'film_id',
		foreignKeyConstraintName: 'film_category_film_id_fkey',
	})
	film: Film;

	@ManyToOne(
		() => Category,
		category => category.categoryId,
	)
	@JoinColumn({
		name: 'category_id',
		foreignKeyConstraintName: 'film_category_category_id_fkey',
	})
	category: Category;
}

export { FilmCategory };
