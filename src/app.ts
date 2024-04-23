import http from 'node:http';
import { getApi } from './api/api';
import { dataSource } from './database/dataSource';
import { buntstift } from 'buntstift';

const main = async () => {
	// Init Database
	try {
		await dataSource.initialize();
		buntstift.success('Data Source has been initialized!');
	} catch (error) {
		throw new Error(`Error during Data Source initialization: ${error}`);
	}

	// Init server
	const server = http.createServer(getApi());

	const port = process.env.PORT || 3_000;
	server
		.listen(port, () => {
			buntstift.success(`Server has started and is listening on port: ${port}`);
		})
		.on('error', error => {
			buntstift.error(`Server failed because of ${error.message}`);
			throw error;
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
