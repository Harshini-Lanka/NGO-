import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

import {
  Heart,
  Clock,
  CheckCircle,
  Award,
  Calendar,
  MapPin,
} from "lucide-react";

import React, { useEffect, useState } from "react";

import { getVolunteerDashboard } from "../../api/userApi";
import { getMyRegistrations } from "../../api/registrationApi";





const VolunteerOverview = ({ navigateTab, user }) => {

  const [stats, setStats] = useState(null);
  const [myEvents, setMyEvents] = useState([]);

  const loadDashboard = async () => {

    try {

      const statsRes = await getVolunteerDashboard();

      setStats(statsRes.data.stats);

      const regRes = await getMyRegistrations();

      const approvedEvents = regRes.data.registrations
        .filter(
          reg =>
            reg.status === "Approved" &&
            reg.event
        )
        .map(reg => reg.event);

      setMyEvents(approvedEvents);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    loadDashboard();

  }, []);

  if (!stats) {

    return (
      <div className="p-10 text-center">
        Loading Dashboard...
      </div>
    );

  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-[#FF8C42] to-orange-400 text-white p-8 overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Hello, {user.name}! 👋</h2>
          <p className="text-orange-50 max-w-xl">Ready to make a difference today? You have 1 upcoming event this week. Your dedication is inspiring!</p>
        </div>
        <Heart className="absolute -right-4 -bottom-4 text-white/10 w-48 h-48 transform -rotate-12" />
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500"><Clock size={28} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Applications</p><h3 className="text-3xl font-bold text-gray-900">{stats.totalApplications}</h3></div>
        </Card>
        <Card className="p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-500"><CheckCircle size={28} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Approved</p><h3 className="text-3xl font-bold text-gray-900">{stats.approved}</h3></div>
        </Card>
        <Card className="p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-500"><Award size={28} /></div>
          <div><p className="text-gray-500 text-sm font-medium">Certificates</p><h3 className="text-3xl font-bold text-gray-900">{stats.certificates}</h3></div>
        </Card>
      </div>

      {/* Next Event */}
      {myEvents.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">My Upcoming Events</h3>
          <div className="space-y-4">
            {myEvents.map((event) => (
              <Card
                key={event._id}
                className="p-1 border-l-4 border-l-[#4CAF50]"
              >
                <div className="flex flex-col md:flex-row gap-6 p-5">

                  <img
                    src={
                      event.image?.url ||
                      "/images/default.png"
                    }
                    className="w-full md:w-48 h-32 object-cover rounded-xl"
                    alt={event.title}
                  />

                  <div className="flex-1 flex flex-col justify-between">

                    <div>
                      <div className="flex justify-between items-start">

                        <h4 className="text-xl font-bold text-gray-900">
                          {event.title}
                        </h4>

                        <Badge type="success">
                          Approved
                        </Badge>

                      </div>

                      <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                        <MapPin size={16} />
                        {event.location}
                      </p>

                    </div>

                    <div className="flex gap-4 text-sm font-medium text-gray-600 mt-4">

                      <span className="flex items-center gap-1">
                        <Calendar
                          size={16}
                          className="text-[#FF8C42]"
                        />
                        {new Date(event.date).toLocaleDateString()}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock
                          size={16}
                          className="text-[#FF8C42]"
                        />
                        {event.time}
                      </span>

                    </div>

                  </div>

                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default VolunteerOverview;