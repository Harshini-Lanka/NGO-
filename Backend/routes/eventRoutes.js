import express from "express";

import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  completeEvent
} from "../controllers/eventController.js";
import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getEvents);

// Admin Only
router.post("/", protect, adminOnly, createEvent);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateEvent
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteEvent
);


router.patch(
  "/:id/complete",
  protect,
  adminOnly,
  completeEvent
);

export default router;