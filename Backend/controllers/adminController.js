import Event from "../models/Event.js";
import User from "../models/User.js";
import Registration from "../models/Registration.js";

export const getDashboardStats = async (req, res) => {

  try {

    const totalEvents = await Event.countDocuments();

    const totalVolunteers = await User.countDocuments({
      role: "volunteer",
    });

    const totalParticipants = await User.countDocuments({
      role: "participant",
    });

    const totalRegistrations = await Registration.countDocuments();

    const pendingRegistrations = await Registration.countDocuments({
      status: "Pending",
    });

    const approvedRegistrations = await Registration.countDocuments({
      status: "Approved",
    });

    res.json({
      success: true,
      stats: {
        totalEvents,
        totalVolunteers,
        totalParticipants,
        totalRegistrations,
        pendingRegistrations,
        approvedRegistrations,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};