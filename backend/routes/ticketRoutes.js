import express from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js";
import { protect } from "../middleware/authMiddleware.js";
import { noteRoutes } from "./noteRoutes.js";

// Create the main router
const router = express.Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

// Re-route into note router
router.use("/:ticketId/notes", noteRoutes);

export const ticketRoutes = router;
