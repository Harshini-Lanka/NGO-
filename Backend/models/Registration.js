import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["volunteer", "participant"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    qrCode: {
      type: String,
      default: "",
    },

    ticketId: {
      type: String,
      unique: true,
    },

    attendanceStatus: {
      type: String,
      enum: ["Pending", "Present", "Absent"],
      default: "Pending",
    },
    emergencyContact: {
      type: String,
    },

    notes: {
      type: String,
    },

    peopleCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },

);

export default mongoose.model("Registration", registrationSchema);