import express from "express";

import * as HomeController from "../controllers/home";

const router = express.Router();

router.get("/", HomeController.home_get_rand_artists_albums);

export default router;
