import express from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

// env configs
dotenv.config();

// Constants
const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routers called in console during development
if (process.env.NODE_ENV === 'development') {
	// Load yaml file using YAML.load
	const swaggerDocument = YAML.load('./swagger.yaml');

	// HTTP request logger middleware
	app.use(morgan('dev'));

	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
	console.log('production');
}

/***********************************************************************************
 *                         API routers
 **********************************************************************************/

// Add api router
app.use('/api/v1', (req, res) => {
	res.send('Hello World!');
});

// Export here and start in a diff file (for testing).
export default app;
