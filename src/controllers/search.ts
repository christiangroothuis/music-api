import { Request, Response, NextFunction } from "express";

import Album from "../models/album";
import Artist from "../models/artist";

type searchArtists = (query: string) => void;
type searchAlbums = (query: string) => void;
type searchSongs = (query: RegExp) => void;

const searchArtists: searchArtists = (query) =>
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

const searchAlbums:searchAlbums = (query) =>
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

const searchSongs:searchSongs = (query) =>
	new Promise((resolve, reject) => {
		Album.find({ "tracks.name": { $regex: query } }, { "tracks.$": 1 })
			.limit(15)
			.populate("tracks.artists", "name")
			.select("img")
			.then((docs) => {
				resolve(
					docs.map((item: any) => {
						const track = item.tracks[0];
						return {
							_id: item._id,
							img: item.img,
							name: track.name,
							artist: track.artists,
						};
					})
				);
			})
			.catch((err) => reject(err));
	});

export const search_artists_albums = (
	req: Request,
	res: Response,
	next: NextFunction
):void => {
	const query = req.params.query;
	const regQuery = new RegExp(escapeRegex(query), "gi");

	Promise.all([
		searchAlbums(query),
		searchArtists(query),
		searchSongs(regQuery),
	])
		.then((data) => {
			const [albums, artists, songs] = data;

			res.json({
				albums,
				artists,
				songs,
			});
		})
		.catch((err) => {
			next(err);
			console.log(err);
		});
};

function escapeRegex(text: string) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
