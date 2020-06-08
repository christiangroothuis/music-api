import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Album from "../models/album";

export const albums_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Album.find()
		.select("_id name release_date img artists")
		.sort({ name: 1 })
		.populate("artists", "name")
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

export const albums_get_album = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.albumId;

	Album.findById(id)
		.select("_id name release_date color img artists tracks type")
		.populate({
			path: "artists tracks.artists",
			select: "name",
		})
		.then((doc) => {
			if (doc) {
				res.status(200).json({
					album: doc,
				});
			} else {
				res.status(404).json({
					message: "No valid entry found for provided ID",
				});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};
