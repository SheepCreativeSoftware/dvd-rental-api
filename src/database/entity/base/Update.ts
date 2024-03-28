import { BaseEntity, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
class Update extends BaseEntity {
	@UpdateDateColumn({
		name: 'last_update',
		type: 'timestamp without time zone',
	})
	lastUpdate: Date;
}

export { Update };
