import express from "express";

import {
  registerForEvent,
  getRegistrations,
  getMyRegistrations,
  getRecentRegistrations,
  updateRegistrationStatus,
  getMyCertificates,
  updateAttendance
} from "../controllers/registrationController.js";


import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";
const router = express.Router();

// User registers for an event
router.post("/", protect, registerForEvent);

router.get(
  "/",
  protect,
  adminOnly,
  getRegistrations
);

router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateRegistrationStatus
);

router.get(
  "/my",
  protect,
  getMyRegistrations
);

router.get(
    "/certificates",
    protect,
    getMyCertificates
);

router.get(
  "/recent",
  protect,
  adminOnly,
  getRecentRegistrations
);


router.patch(
    "/attendance/:id",
    protect,
    adminOnly,
    updateAttendance
);

export default router;