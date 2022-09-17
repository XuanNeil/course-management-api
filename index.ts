import server from './src/app';

// Constants
const port = process.env.PORT || 3000;

// Start server
server.listen(port, async () => {
	console.log(`Example app listening on port ${port}`);
});
