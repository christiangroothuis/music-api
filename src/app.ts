import express, { Application, Response, Request } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import "./lib/env";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

const app: Application = express();

// import routes
// import search from './routes/';

mongoose
	.connect(process.env.DB_CONNECTION || "", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err: any) => console.log(`Error when connecting to mongodb`, err));

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Use routes:
// app.use('/api/search', search);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
