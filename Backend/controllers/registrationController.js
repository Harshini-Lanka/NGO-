import Registration from "../models/Registration.js";
import Event from "../models/Event.js";

import { generateTicketId } from "../services/ticketService.js";
import { generateQRCode } from "../services/qrService.js";

export const registerForEvent = async (req, res) => {

  try {

    const {
      eventId,
      emergencyContact,
      notes,
      peopleCount
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    const existing = await Registration.findOne({
      event: eventId,
      user: req.user._id
    });

    if (existing) {

      return res.status(400).json({
        success: false,
        message: "Already Registered"
      });

    }

    const ticketId = generateTicketId();

    const qrCode = await generateQRCode({

      ticketId,
      eventId,
      user: req.user._id

    });

    const registration = await Registration.create({

      event: eventId,
      user: req.user._id,
      role: req.user.role,
      ticketId,
      qrCode

    });

    res.status(201).json({

      success: true,
      registration

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};


export const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email phone")
      .populate("event", "title date location")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.json({
      success: true,
      registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyRegistrations = async (req, res) => {
  try {

    const registrations = await Registration.find({
      user: req.user._id,
    })
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      registrations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const getMyCertificates = async (req, res) => {

  try {

    const registrations = await Registration.find({

      user: req.user._id,
      status: "Approved",
      attendanceStatus: "Present"

    }).populate("event").populate("user", "name");
    const certificates = registrations.filter(reg =>
      reg.event &&
      reg.event.status === "Completed"
    );

    res.json({

      success: true,
      certificates

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message

    });

  }

};





export const getRecentRegistrations = async (req, res) => {

  try {

    const registrations = await Registration.find()
      .populate("user", "name")
      .populate("event", "title")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      registrations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};





export const updateAttendance = async (req, res) => {

  try {

    const { id } = req.params;
    const { attendanceStatus } = req.body;

    const registration = await Registration.findByIdAndUpdate(

      id,

      { attendanceStatus },

      { new: true }

    );

    if (!registration) {

      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });

    }

    res.json({

      success: true,
      registration,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};