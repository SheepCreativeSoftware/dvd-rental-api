import { Entity, UpdateDateColumn } from 'typeorm';

@Entity()
class Update {
	@UpdateDateColumn({
		name: 'last_update',
		type: 'timestamp without time zone',
	})
	lastUpdate: Date;
}

export { Update };
