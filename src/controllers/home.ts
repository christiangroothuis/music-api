import { Request, Response, NextFunction } from "express";
<<<<<<< HEAD
=======
import mongoose from "mongoose";
>>>>>>> 2978098b068f76c3436a6a11e4480ede8da0ced4

import Album from "../models/album";
import Artist from "../models/artist";

const getRandArtists = () =>
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
			.then((data) => {
				resolve(data);
			})
			.catch((err) => reject(err));
	});

const getRandAlbums = () =>
<<<<<<< HEAD
	new Promise((resolve, reject) => {
=======
	new Promise(async (resolve, reject) => {
>>>>>>> 2978098b068f76c3436a6a11e4480ede8da0ced4
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
			.then((data) => {
				resolve(data);
			})
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
