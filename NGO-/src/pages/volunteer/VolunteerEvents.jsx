
import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

import {
  Search,
  Filter,
  MapPin,
  Clock,
} from "lucide-react";

import { getEvents } from "../../api/eventApi";
import { getMyRegistrations } from "../../api/registrationApi";
import EventRegistrationModal from "./EventRegistrationModal";


const getEventImage = (category) => {
  switch (category?.toLowerCase()) {
    case "education":
      return "/images/education.png";

    case "medical":
      return "/images/health.png";

    case "environment":
      return "/images/environment.png";

    case "community":
      return "/images/community.svg";

    case "food donation":
      return "/images/food donation.png";

    case "women empowerment":
      return "/images/women empowerment.png";

    case "animal welfare":
      return "/images/animal welfare.png";


    default:
      return "/images/default.png";
  }
};


const VolunteerEvents = ({ showToast, onRegisterClick }) => {

  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [registeringEvent, setRegisteringEvent] = useState(null);

  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

  const loadEvents = async () => {
    try {
      const res = await getEvents();
      setEvents(res.data.events);
    } catch (err) {
      console.error(err);
    }
  };
  const loadMyRegistrations = async () => {
    try {

      const res = await getMyRegistrations();

      console.log(res.data.registrations);

      const registeredIds = res.data.registrations
        .filter((reg) => reg.event !== null)
        .map((reg) => reg.event._id);

      setRegisteredEvents(registeredIds);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEvents();
    loadMyRegistrations();
  }, []);
  return (
    <>
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search events by name or location..."
  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none"
/>
        </div>
        <div className="flex gap-2">
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-[#FF8C42]"
  >
    <option value="All">All Categories</option>
    <option value="Education">Education</option>
    <option value="Medical">Medical</option>
    <option value="Environment">Environment</option>
    <option value="Community">Community</option>
    <option value="Food Donation">Food Donation</option>
    <option value="Women Empowerment">Women Empowerment</option>
    <option value="Animal Welfare">Animal Welfare</option>
  </select>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events
  .filter((event) => {
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      event.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  })
  .map((event) => (
          <Card key={event._id} hover className="flex flex-col">
            <div className="h-40 w-full relative">
              <img
                src={getEventImage(event.category)}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm">
                {new Date(event.date).toLocaleDateString()}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#FF8C42] uppercase tracking-wider">{event.category}</span>
                {<Badge
                  type={
                    event.status === "Upcoming"
                      ? "success"
                      : event.status === "Completed"
                        ? "warning"
                        : "danger"
                  }
                >
                  {event.status}
                </Badge>}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{event.title}</h3>
              <div className="space-y-3 mb-6 flex-1 text-sm text-gray-600">
                <div className="flex items-center gap-2"><MapPin size={16} className="text-gray-400 shrink-0" /> <span className="truncate">{event.location}</span></div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-gray-400 shrink-0" /> {event.time}</div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Volunteers</p>
                    <p className="font-medium text-gray-800">{event.volunteersRegistered} / {event.volunteersRequired}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Participants</p>
                    <p className="font-medium text-gray-800">{event.participantsRegistered}</p>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                variant={
                  registeredEvents.includes(event._id)
                    ? "success"
                    : event.status === "Full"
                      ? "ghost"
                      : "primary"
                }
                disabled={
                  event.status === "Full" ||
                  registeredEvents.includes(event._id)
                }
                onClick={() => setRegisteringEvent(event)}              >
                {registeredEvents.includes(event._id)
                  ? "✓ Registered"
                  : event.status === "Full"
                    ? "Registration Closed"
                    : "Register"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
    {
    registeringEvent && (
      <EventRegistrationModal
        event={registeringEvent}
        onClose={() => setRegisteringEvent(null)}
        onRegistrationSuccess={(eventId) => {
          setRegisteredEvents((prev) => [...prev, eventId]);
        }}
      />
    )
  }
  </>
  );
};



export default VolunteerEvents;