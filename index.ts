import server from './src/app';
import { DBConnect } from './database';

// Constants
const port = process.env.PORT || 3000;

// Start server
server.listen(port, async () => {
	await DBConnect();
	console.log(`Example app listening on port ${port}`);
});
