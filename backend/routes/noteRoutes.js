import express from "express";
import { getNotes, addNote } from "../controllers/noteController.js";

import { protect } from "../middleware/authMiddleware.js";

// Allows for nested route:
const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNote);

export const noteRoutes = router;
