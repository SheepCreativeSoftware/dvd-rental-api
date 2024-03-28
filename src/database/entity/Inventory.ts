import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Update } from './base/Update';
import { Film } from './Film';
import { Store } from './Store';

@Entity('inventory')
class Inventory extends Update {
	@PrimaryGeneratedColumn({
		name: 'inventory_id',
		type: 'integer',
	})
	inventoryId: number;

	@ManyToOne(
		() => Film,
		film => film.filmId,
	)
	@JoinColumn({
		name: 'film_id',
		foreignKeyConstraintName: 'inventory_film_id_fkey',
	})
	film: Film;

	@ManyToOne(
		() => Store,
		actor => actor.storeId,
	)
	@JoinColumn({
		name: 'store_id',
		foreignKeyConstraintName: 'inventory_film_id_fkey',
	})
	store: Store;
}

export { Inventory };
