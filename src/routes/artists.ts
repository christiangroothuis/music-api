import express from "express";
// import checkAuth from "../middleware/check-auth";

import * as ArtistsController from "../controllers/artists";

const router = express.Router();

router.get("/", ArtistsController.artists_get_all);

// router.get("/:albumId", ArtistsController.artists_get_album);

// router.post("/", checkAuth, ArtistsController.artists_create_album);

// router.delete("/:albumId", checkAuth, ArtistsController.artists_delete_album);

export default router;
