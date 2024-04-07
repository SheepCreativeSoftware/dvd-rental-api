import type { SessionEntity } from 'typeorm-store-typeormfix';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('session')
class Session extends BaseEntity implements SessionEntity {
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
