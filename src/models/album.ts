import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
		unique: true,
	},
	img: {
		type: String,
		required: true,
	},
	release_date: Date,
	color: {
		type: String,
		default: "#535353",
	},
	type: {
		type: String,
		default: "album",
	},
	artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
	tracks: [
		{
			name: {
				type: String,
				required: true,
			},
			file: {
				type: String,
				required: true,
			},
			duration: Number,
			artists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
		},
	],
});

export default mongoose.model("Album", AlbumSchema);
