import { Request, Response, NextFunction } from "express";

import Album from "../models/album";
import Artist from "../models/artist";

const searchArtists = (query: string) =>
	new Promise((resolve, reject) => {
		Artist.aggregate([
			{
				$match: {
					$text: {
						$search: query,
					},
				},
			},
			{
				$limit: 15,
			},
			{
				$sort: {
					score: {
						$meta: "textScore",
					},
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
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

const searchAlbums = (query: string) =>
	new Promise((resolve, reject) => {
		Album.aggregate([
			{
				$match: {
					$text: {
						$search: query,
					},
				},
			},
			{
				$limit: 15,
			},
			{
				$sort: {
					score: {
						$meta: "textScore",
					},
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
			.then((res) => resolve(res))
			.catch((err) => reject(err));
	});

export const search_artists_albums = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const query = req.params.query;

	Promise.all([searchAlbums(query), searchArtists(query)])
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
