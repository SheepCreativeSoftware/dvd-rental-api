import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Actor } from './entity/Actor';
import { Category } from './entity/Category';
import { Country } from './entity/Country';
import { Language } from './entity/Language';
import { City } from './entity/City';
import { Address } from './entity/Address';
import { Staff } from './entity/Staff';
import { Store } from './entity/Store';
import { Film } from './entity/Film';
import { Customer } from './entity/Customer';
import { FilmActor } from './entity/FilmActor';
import { FilmCategory } from './entity/FilmCategory';
import { Inventory } from './entity/Inventory';
import { Rental } from './entity/Rental';
import { Payment } from './entity/Payment';
import { Session } from './entity/Session';

const dataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT) || 5432,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	synchronize: false,
	logging: false,
	entities: [
		Actor,
		Address,
		Category,
		City,
		Country,
		Customer,
		Film,
		FilmActor,
		FilmCategory,
		Inventory,
		Language,
		Payment,
		Rental,
		Session,
		Staff,
		Store,
	],
	migrations: [],
	subscribers: [],
});

export { dataSource };
