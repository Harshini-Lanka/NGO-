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
export const getNeedsAttention = async (req, res) => {
  try {

    const pendingRegistrations =
      await Registration.countDocuments({
        status: "Pending",
      });

    const today = new Date();

    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const upcomingEvents =
      await Event.find({
        date: {
          $gte: today,
          $lte: tomorrow,
        },
        status: "Upcoming",
      }).select("title date");

    const almostFullEvents =
      await Event.find({
        status: "Upcoming",
        $expr: {
          $gte: [
            {
              $add: [
                "$volunteersRegistered",
                "$participantsRegistered",
              ],
            },
            {
              $multiply: [
                "$capacity",
                0.8,
              ],
            },
          ],
        },
      }).select("title");

    res.json({
      success: true,
      needsAttention: {
        pendingRegistrations,
        upcomingEvents,
        almostFullEvents,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
export const getMonthlyRegistrations = async (req, res) => {

  try {

    const registrations = await Registration.aggregate([

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt"
            }
          },
          registrations: {
            $sum: 1
          }
        }
      },

      {
        $sort: {
          "_id.month": 1
        }
      }

    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const chartData = months.map((month, index) => {

      const found = registrations.find(
        r => r._id.month === index + 1
      );

      return {
        name: month,
        registrations: found ? found.registrations : 0,
      };

    });

    res.json({
      success: true,
      chartData,
    });

  }

  catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};