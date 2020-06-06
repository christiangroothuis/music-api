import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
		unique: true,
	},
	color: {
		type: String,
		default: "#535353",
	},
	img: {
		type: String,
	},
	type: {
		type: String,
		default: "artist",
	},
});

const ArtistModel = mongoose.model("Artist", ArtistSchema);

export { ArtistModel };
