import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Update } from './base/Update';

@Entity('category')
class Category extends Update {
	@PrimaryGeneratedColumn({
		name: 'category_id',
		type: 'integer',
	})
	categoryId: number;

	@Column({
		name: 'name',
		type: 'character varying',
		length: 25,
	})
	name: string;
}

export { Category };
