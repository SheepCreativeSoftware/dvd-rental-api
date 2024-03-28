import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Update } from './base/Update';
import { Film } from './Film';
import { Actor } from './Actor';

@Entity('film_actor')
class FilmActor extends Update {
	@PrimaryColumn({
		name: 'actor_id',
		type: 'integer',
	})
	actorId: number;

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
		foreignKeyConstraintName: 'film_actor_film_id_fkey',
	})
	film: Film;

	@ManyToOne(
		() => Actor,
		actor => actor.actorId,
	)
	@JoinColumn({
		name: 'actor_id',
		foreignKeyConstraintName: 'film_actor_actor_id_fkey',
	})
	actor: Actor;
}

export { FilmActor };
