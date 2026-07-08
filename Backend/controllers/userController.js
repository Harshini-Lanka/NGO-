import Registration from "../models/Registration.js";

export const getVolunteerDashboard = async (req, res) => {
  try {

    const totalApplications = await Registration.countDocuments({
      user: req.user._id,
    });

    const approved = await Registration.countDocuments({
      user: req.user._id,
      status: "Approved",
    });

    const pending = await Registration.countDocuments({
      user: req.user._id,
      status: "Pending",
    });

   const registrations = await Registration.find({
  user: req.user._id,
  status: "Approved",
  attendanceStatus: "Present",
}).populate("event");

const certificates = registrations.filter(
  (reg) => reg.event && reg.event.status === "Completed"
).length;

    res.json({
      success: true,
      stats: {
        totalApplications,
        approved,
        pending,
        certificates,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};