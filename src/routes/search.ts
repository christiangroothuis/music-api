import express from "express";

import * as SearchController from "../controllers/search";

const router = express.Router();

router.get("/:query", SearchController.search_artists_albums);

export default router;
