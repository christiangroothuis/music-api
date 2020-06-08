import express from "express";
import checkAuth from "../middleware/check-auth";

import * as ArtistsController from "../controllers/artists";

const router = express.Router();

router.get("/", ArtistsController.artists_get_all);

router.get("/:artistId", ArtistsController.artists_get_artist);

router.post("/", checkAuth, ArtistsController.artists_create_artist);

router.patch("/:artistId", checkAuth, ArtistsController.artists_update_artist);

router.delete("/:artistId", checkAuth, ArtistsController.artists_delete_artist);

export default router;
