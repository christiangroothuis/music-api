import express, { Application } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";

import "./lib/env";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";

const app: Application = express();

import albums from "./routes/albums";
import artists from "./routes/artists";
import home from "./routes/home";
import search from "./routes/search";

mongoose
	.connect(process.env.MONGO_URI!, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err: any) => console.log(`Error when connecting to mongodb`, err));

mongoose.Promise = global.Promise;

// app.use(morgan("dev"));
app.use(
	morgan(
		`:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms`
	)
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use("/albums", albums);
app.use("/artists", artists);
app.use("/home", home);
app.use("/search", search);

app.use(errorHandler);
app.use(notFoundHandler);

export default app;
