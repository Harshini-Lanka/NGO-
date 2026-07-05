import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      event,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find()
      .sort({ date: 1 });

    res.json({
      success: true,
      events,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateEvent = async (req, res) => {
  try {

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteEvent = async (req, res) => {

  try {

    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const completeEvent = async (req, res) => {

  try {

    const event = await Event.findByIdAndUpdate(

      req.params.id,

      {
        status: "Completed",
      },

      {
        new: true,
      }

    );

    if (!event) {

      return res.status(404).json({

        success: false,
        message: "Event not found",

      });

    }

    res.json({

      success: true,
      event,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};