import type { SessionEntity } from 'typeorm-store-typeormfix';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('session')
class Session implements SessionEntity {
	@PrimaryColumn({
		type: 'text',
	})
	id: string;

	@Column({
		type: 'integer',
	})
	expiresAt: number;

	@Column({
		type: 'text',
	})
	data: string;
}

export { Session };
