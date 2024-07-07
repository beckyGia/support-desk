import express from "express";
import { Router } from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
} from "../controllers/ticketController.js";
import { protect } from "../middleware/authMiddleware.js";

export const ticketRoutes = Router();

ticketRoutes.route("/").get(protect, getTickets).post(protect, createTicket);

ticketRoutes
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);
