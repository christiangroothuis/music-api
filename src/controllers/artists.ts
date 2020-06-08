import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import Artist from "../models/artist";
import Album from "../models/album";

export const artists_get_all = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Artist.find()
		.select("_id name img type")
		.sort({ name: 1 })
		.then((docs) => {
			res.json({
				count: docs.length,
				artists: docs,
			});
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

const getArtist = (id: string) =>
	new Promise((resolve, reject) => {
		Artist.findById(id)
			.select("name img color type")
			.then((doc) => {
				resolve(doc);
			})
			.catch((err) => {
				reject(err);
			});
	});

const getAlbums = (id: string) =>
	new Promise((resolve, reject) => {
		Album.find({ artists: id })
			.select("name _id img artists type")
			.populate({
				path: "artists",
				select: "name",
			})
			.then((doc) => {
				resolve(doc);
			})
			.catch((err) => {
				reject(err);
			});
	});

const getAlbumsTracks = (id: string) =>
	new Promise((resolve, reject) => {
		Album.find({ "tracks.artists": id })
			.select("name _id img artists type")
			.populate({
				path: "artists",
				select: "name",
			})
			.then((doc) => {
				resolve(doc);
			})
			.catch((err) => {
				reject(err);
			});
	});

export const artists_get_artist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id: string = req.params.artistId;

	Promise.all([getArtist(id), getAlbums(id), getAlbumsTracks(id)])
		.then((data) => {
			const [artist, albums, albumsTracks]: any = data;
			const featuredAlbums = albumsTracks.filter((albumTrack: any) => {
				const result = albums.filter((album: any) => {
					return album.name == albumTrack.name;
				});
				return result.length === 0;
			});

			res.json({
				artist: {
					...artist._doc,
					albums,
					featuredAlbums,
				},
			});
		})
		.catch((err) => {
			if (err.name === "CastError") {
				res.status(404).json({
					error: {
						message: "No valid entry found for provided ID",
					},
				});
			} else {
				next(err);
				console.log(err);
			}
		});
};

export const artists_create_artist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, img, color } = req.body;

	const artist = new Artist({
		_id: new mongoose.Types.ObjectId(),
		name,
		img,
		color,
	});
	artist
		.save()
		.then((result) => {
			res.status(201).json({
				message: "Created artist successfully",
				createdProduct: {
					_id: result._id,
					name,
					img,
					color,
				},
			});
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

export const artists_update_artist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.artistId;
	const updateOps: any = {};

	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}

	Artist.update({ _id: id }, { $set: updateOps })
		.then(() => {
			res.status(200).json({
				message: "Artist updated",
			});
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

export const artists_delete_artist = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.artistId;
	Artist.deleteOne({ _id: id })
		.then(() => {
			res.status(200).json({
				message: "Artist deleted",
			});
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};
