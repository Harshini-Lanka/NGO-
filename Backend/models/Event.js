import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Food Donation",
                "Education",
                "Medical",
                "Environment",
                "Women Empowerment",
                "Animal Welfare",
                "Other",
            ],
        },

        description: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        capacity: {
            type: Number,
            required: true,
        },

        volunteersRequired: {
            type: Number,
            default: 0,
        },

        volunteersRegistered: {
            type: Number,
            default: 0,
        },

        participantsRegistered: {
            type: Number,
            default: 0,
        },

        image: {
            url: {
                type: String,
                default: "",
            },
            filename: {
                type: String,
                default: "",
            }
        },
    status: {
            type: String,
            enum: ["Upcoming", "Completed", "Cancelled"],
            default: "Upcoming",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Event", eventSchema);