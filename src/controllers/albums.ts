import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Album from "../models/album";
// import Artist from "../models/artist";

export const albums_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Album.find()
		.select("_id name release_date artwork artists tracks")
		.sort({ name: 1 })
		.populate("artists", "name visuals")
		.populate("tracks.artists", "name")
		.then((docs) => {
			res.json({
				count: docs.length,
				albums: docs,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
