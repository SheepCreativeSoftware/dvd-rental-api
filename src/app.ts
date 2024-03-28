import http from 'node:http';
import { getApi } from './api/api';
import { dataSource } from './database/dataSource';
import { buntstift } from 'buntstift';
import { Address } from './database/entity/Address';
import { Store } from './database/entity/Store';
import { Film } from './database/entity/Film';
import { Customer } from './database/entity/Customer';
import { FilmActor } from './database/entity/FilmActor';
import { FilmCategory } from './database/entity/FilmCategory';
import { Inventory } from './database/entity/Inventory';
import { Rental } from './database/entity/Rental';
import { Payment } from './database/entity/Payment';

const main = async () => {
	// Init Database
	try {
		await dataSource.initialize();
		buntstift.success('Data Source has been initialized!');
	} catch (error) {
		buntstift.error(`Error during Data Source initialization: ${error}`);
	}

	// Init server
	const server = http.createServer(getApi());

	const port = process.env.PORT || 3_000;
	server.listen(port, () => {
		buntstift.success(`Server has started on port: ${port}`);
	});
};

process.on('uncaughtException', (err, origin) => {
	// Print last output
	buntstift.error(`Caught exception: ${err}\n`);
	buntstift.error(`Exception origin: ${origin}`);
	if (err.stack) {
		buntstift.error(`Stack: ${err.stack}`);
	}
	buntstift.error('Exiting Process...');

	// Kill app, because you don't know what the concesquences will be (restart-on-failure from server-side)
	process.exit(1);
});

main();