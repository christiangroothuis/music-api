import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Artist from "../models/artist";

export const artists_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Artist.find()
		.select("_id name img type")
		.sort({ name: 1 })
		.exec()
		.then((docs) => {
			res.json({
				count: docs.length,
				artists: docs
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
