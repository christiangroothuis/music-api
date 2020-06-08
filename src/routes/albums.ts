import express from "express";
import checkAuth from "../middleware/check-auth";

import * as AlbumsController from "../controllers/albums";

const router = express.Router();

router.get("/", AlbumsController.albums_get_all);

router.get("/:albumId", AlbumsController.albums_get_album);

// router.post("/", checkAuth, AlbumsController.albums_create_album);

// router.delete("/:albumId", checkAuth, AlbumsController.albums_delete_album);

export default router;
