import { Request, Response, NextFunction } from "express";

import Album from "../models/album";
import Artist from "../models/artist";

type getRandArtists = () => void;
type getRandAlbums = () => void;

const getRandArtists: getRandArtists = () =>
	new Promise((resolve, reject) => {
		Artist.aggregate([
			{
				$sample: {
					size: 10,
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					img: 1,
					type: 1,
				},
			},
		])
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

const getRandAlbums: getRandAlbums = () =>
	new Promise(async (resolve, reject) => {
		Album.aggregate([
			{
				$sample: {
					size: 10,
				},
			},
			{
				$lookup: {
					from: "artists",
					localField: "artists",
					foreignField: "_id",
					as: "artists",
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					img: 1,
					type: 1,
					"artists._id": 1,
					"artists.name": 1,
				},
			},
		])
			.then((data) => resolve(data))
			.catch((err) => reject(err));
	});

export const home_get_rand_artists_albums = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	Promise.all([getRandAlbums(), getRandArtists()])
		.then((data) => {
			const [albums, artists] = data;

			res.json({
				albums,
				artists,
			});
		})
		.catch((err) => {
			next(err);
			console.log(err);
		});
};
