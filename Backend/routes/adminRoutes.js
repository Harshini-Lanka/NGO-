import express from "express";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

import {
  getDashboardStats,
  getNeedsAttention,
  getMonthlyRegistrations,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

router.get(
  "/needs-attention",
  protect,
  adminOnly,
  getNeedsAttention
);

router.get(
  "/monthly-registrations",
  protect,
  adminOnly,
  getMonthlyRegistrations
);
export default router;