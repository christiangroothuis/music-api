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

export const albums_create_album = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, release_date, img, color, artists, tracks } = req.body;

	const album = new Album({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		release_date: release_date,
		img: img,
		color: color,
		artists: artists,
		tracks: tracks,
	});

	album
		.save()
		.then((result) => {
			res.status(201).json({
				message: "Created album successfully",
				createdProduct: {
					_id: result._id,
					name,
					release_date,
					img,
					color,
					artists,
					tracks,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

export const albums_update_album = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.albumId;
	const updateOps:any = {};

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}

	Album.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(() => {
			res.status(200).json({
				message: "Product updated",
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};

export const albums_delete_album = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.albumId;

	Album.remove({ _id: id })
		.exec()
		.then(() => {
			res.status(200).json({
				message: "Album deleted",
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
};
