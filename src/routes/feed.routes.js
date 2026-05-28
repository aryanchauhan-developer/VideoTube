import { Router } from "express";

import { getHomeFeed } from "../controllers/feed.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getHomeFeed)

export default router