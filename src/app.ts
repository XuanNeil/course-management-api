import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { mainRouters } from './routers';
import { CustomError, ErrorsMessage } from './contants';
import HttpStatusCodes from 'http-status-codes';
import helmet from 'helmet';

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
	app.use(helmet());
}

/***********************************************************************************
 *                         API routers
 **********************************************************************************/

// Add api router
app.use('/api/v1', mainRouters);

app.use((err: Error | CustomError, _req: Request, res: Response, _next: NextFunction) => {
	if (err instanceof CustomError) {
		const error = err as CustomError;

		return res.status(error.status).json(error.response);
	}

	return res.status(HttpStatusCodes.BAD_REQUEST).json({
		message: ErrorsMessage.ERROR_BAD_REQUEST,
	});
});

// Export here and start in a diff file (for testing).
export default app;
