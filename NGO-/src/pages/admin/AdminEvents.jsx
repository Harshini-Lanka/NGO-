import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

import {
    Plus,
    Edit,
    Trash2,
    Calendar,
    MapPin,
} from "lucide-react";

import {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    completeEvent
} from "../../api/eventApi";

const AdminEvents = () => {

    const [events, setEvents] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [editingEvent, setEditingEvent] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "Food Donation",
        description: "",
        location: "",
        date: "",
        time: "",
        capacity: "",
        volunteersRequired: "",
    });;

    const loadEvents = async () => {
        try {
            const res = await getEvents();
            setEvents(res.data.events);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);


    const handleComplete = async (id) => {

        try {

            await completeEvent(id);

            setEvents(prev =>
                prev.map(event =>
                    event._id === id
                        ? {
                            ...event,
                            status: "Completed",
                        }
                        : event
                )
            );

            showToast(
                "Event marked completed!",
                "success"
            );

        } catch (err) {

            showToast(
                "Failed",
                "error"
            );

        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editingEvent) {

                await updateEvent(
                    editingEvent._id,
                    formData
                );

            } else {

                await createEvent(formData);

            }

            setShowModal(false);

            setEditingEvent(null);

            setFormData({
                title: "",
                category: "Food Donation",
                description: "",
                location: "",
                date: "",
                time: "",
                capacity: "",
                volunteersRequired: "",
            });

            loadEvents();

        } catch (err) {

            console.error(err);

        }

    };

    const handleEdit = (event) => {

        setEditingEvent(event);

        setFormData({

            title: event.title,
            category: event.category,
            description: event.description,
            location: event.location,
            date: event.date.split("T")[0],
            time: event.time,
            capacity: event.capacity,
            volunteersRequired: event.volunteersRequired,

        });

        setShowModal(true);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this event?"))
            return;

        try {

            await deleteEvent(id);

            loadEvents();

        } catch (err) {

            console.error(err);

        }

    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">

                <h1 className="text-3xl font-bold">
                    Event Management
                </h1>

                <Button
                    onClick={() => {

                        setEditingEvent(null);

                        setShowModal(true);

                    }}
                >
                    + Create Event
                </Button>

            </div>
            <div className="grid gap-4">

                {events.map(event => (

                    <Card key={event._id}>

                        <div className="p-5 flex justify-between">

                            <div>

                                <h2 className="font-bold text-xl">

                                    {event.title}

                                </h2>

                                <p>{event.category}</p>

                                <p>{event.location}</p>

                                <p>

                                    {new Date(event.date).toLocaleDateString()}

                                </p>

                            </div>

                            <div className="flex gap-2">

                                <Button
                                    variant="outline"
                                    onClick={() => handleEdit(event)}
                                >

                                    Edit

                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(event._id)}
                                >

                                    Delete

                                </Button>

                                {event.status !== "Completed" ? (

                                    <Button
                                        variant="secondary"
                                        onClick={() =>
                                            handleComplete(event._id)
                                        }
                                    >
                                        Mark Complete
                                    </Button>

                                ) : (

                                    <Badge type="success">
                                        Completed
                                    </Badge>

                                )}

                            </div>

                        </div>

                    </Card>

                ))}

            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-xl">

                        <h2 className="text-2xl font-bold mb-6">
                            {editingEvent ? "Edit Event" : "Create Event"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Category
                                </label>

                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-2"
                                >
                                    <option>Food Donation</option>
                                    <option>Education</option>
                                    <option>Medical</option>
                                    <option>Environment</option>
                                    <option>Women Empowerment</option>
                                    <option>Animal Welfare</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Description
                                </label>

                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value
                                        })
                                    }
                                    className="w-full border rounded-xl px-4 py-2"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label>Location</label>

                                    <input
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                location: e.target.value
                                            })
                                        }
                                        className="w-full border rounded-xl px-4 py-2"
                                    />

                                </div>

                                <div>

                                    <label>Date</label>

                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: e.target.value
                                            })
                                        }
                                        className="w-full border rounded-xl px-4 py-2"
                                    />

                                </div>


                                <div>

                                    <label>Time</label>

                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                time: e.target.value
                                            })
                                        }
                                        className="w-full border rounded-xl px-4 py-2"
                                    />

                                </div>


                                <div>

                                    <label>Capacity</label>

                                    <input
                                        type="number"
                                        value={formData.capacity}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                capacity: e.target.value
                                            })
                                        }
                                        className="w-full border rounded-xl px-4 py-2"
                                    />

                                </div>


                                <div>

                                    <label>Volunteers Required</label>

                                    <input
                                        type="number"
                                        value={formData.volunteersRequired}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                volunteersRequired: e.target.value
                                            })
                                        }
                                        className="w-full border rounded-xl px-4 py-2"
                                    />

                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingEvent(null);
                                    }}
                                >

                                    Cancel

                                </Button>

                                <Button type="submit">

                                    {editingEvent
                                        ? "Update Event"
                                        : "Create Event"}

                                </Button>

                            </div>

                        </form>

                    </div>
                </div>
            )}


        </div>

    );

};

export default AdminEvents;