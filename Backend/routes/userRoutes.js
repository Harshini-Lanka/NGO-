import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getVolunteerDashboard } from "../controllers/userController.js";


const router = express.Router();

router.get("/profile", protect, (req, res) => {

  res.json({
    success: true,
    user: req.user,
  });

});

router.get(
  "/dashboard",
  protect,
  getVolunteerDashboard
);

export default router;