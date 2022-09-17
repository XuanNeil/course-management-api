import dotenv from 'dotenv';
import { DBConnect, DBDisconnect, load } from './database';

dotenv.config();

DBConnect().then(async () => {
	await load();

	await DBDisconnect();
});
