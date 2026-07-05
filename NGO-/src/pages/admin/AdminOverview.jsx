import React from "react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/adminApi";

import {
  getRecentRegistrations,
} from "../../api/registrationApi";


import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";

import {
  Calendar,
  Users,
  User,
  Heart,
  Plus,
  QrCode,
  Award,
  DownloadCloud,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

import {
  MOCK_EVENTS,
  MOCK_CHART_DATA,
  MOCK_REGISTRATIONS,
} from "../../utils/mockData";



const AdminOverview = () => {

  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);


  useEffect(() => {

    loadStats();
    loadRecentRegistrations();

  }, []);


  const loadRecentRegistrations = async () => {

    try {

      const res = await getRecentRegistrations();

      setRecentRegistrations(
        res.data.registrations
      );

    } catch (err) {

      console.error(err);

    }

  };

  const loadStats = async () => {
    try {
      const res = await getDashboardStats();

      console.log(res.data);

      setStats(res.data.stats);

    } catch (err) {
      console.error(err);

      console.log(err.response);
    }
    try {
      const res = await getEvents();
      setEvents(res.data.events);
    } catch (err) {
      console.error(err);
    }

  };

  if (!stats) {

    return (
      <div className="text-center p-10">
        Loading dashboard...
      </div>
    );

  }

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <Card className="relative overflow-hidden bg-gradient-to-r from-[#FF8C42] to-[#ffb067] text-white p-8">

        <div className="relative z-10">
          <p className="text-orange-100 text-sm font-medium">
            ADMIN DASHBOARD
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Welcome back, Admin 👋
          </h2>

          <p className="mt-3 text-orange-50 max-w-xl">
            Manage events, volunteers, registrations and reports from one
            place. Here's what's happening today.
          </p>

          <div className="flex gap-4 mt-8">
            <Button className="bg-white text-[#FF8C42] hover:bg-orange-100 shadow-none">
              <Plus size={18} className="mr-2" />
              Create Event
            </Button>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#FF8C42]"
            >
              <QrCode size={18} className="mr-2" />
              Scan QR
            </Button>
          </div>
        </div>

        <Calendar
          className="absolute right-8 bottom-0 text-white/10"
          size={220}
        />
      </Card>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card hover className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Events
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                {stats.totalEvents}
              </h2>

              <p className="text-green-600 text-sm mt-3 font-medium">
                ↑ 8% this month
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Calendar className="text-[#FF8C42]" size={28} />
            </div>
          </div>
        </Card>


        <Card hover className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Volunteers
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                {stats.totalVolunteers}
              </h2>

              <p className="text-green-600 text-sm mt-3 font-medium">
                ↑ 15% this month
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Users className="text-blue-600" size={28} />
            </div>
          </div>
        </Card>


        <Card hover className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Participants
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                {stats.totalParticipants}
              </h2>

              <p className="text-green-600 text-sm mt-3 font-medium">
                ↑ 22% this month
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <User className="text-green-600" size={28} />
            </div>
          </div>
        </Card>


        <Card hover className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Registrations
              </p>

              <h2 className="text-4xl font-bold mt-2 text-gray-900">
                {stats.totalRegistrations}
              </h2>

              <p className="text-green-600 text-sm mt-3 font-medium">
                Approved: {stats.approvedRegistrations}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">
              <Heart className="text-red-500" size={28} />
            </div>
          </div>
        </Card>

      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Monthly Registrations */}
        <Card className="xl:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Monthly Registrations
              </h3>
              <p className="text-sm text-gray-500">
                Volunteer & Participant growth
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={MOCK_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />

              <Line
                type="monotone"
                dataKey="volunteers"
                stroke="#FF8C42"
                strokeWidth={3}
              />

              <Line
                type="monotone"
                dataKey="events"
                stroke="#4CAF50"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h3>

          <div className="space-y-4">

            <Button className="w-full justify-start">
              <Plus className="mr-3" size={18} />
              Create Event
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <QrCode className="mr-3" size={18} />
              Scan QR
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-3" size={18} />
              View Volunteers
            </Button>

            <Button variant="outline" className="w-full justify-start">
              <DownloadCloud className="mr-3" size={18} />
              Export Report
            </Button>

          </div>
        </Card>

      </div>


      {/* Upcoming Events & Recent Registrations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Upcoming Events */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Upcoming Events
            </h3>

            <Button variant="ghost" className="text-[#FF8C42]">
              View All
            </Button>
          </div>

          <div className="space-y-5">

            {events.slice(0, 3).map(event => (

              <div
                key={event._id}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition"
              >

                <img
                  src={
                    event.image?.url ||
                    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000"
                  }
                  alt={event.title}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900">
                    {event.title}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    {event.location}
                  </p>

                </div>

                <Badge
                  type={event.status === "Upcoming" ? "success" : "warning"}
                >
                  {event.status}
                </Badge>

              </div>

            ))}

          </div>
        </Card>


        {/* Recent Registrations */}
        <Card className="p-6">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-xl font-bold text-gray-900">
              Recent Registrations
            </h3>

            <Button variant="ghost" className="text-[#FF8C42]">
              View All
            </Button>

          </div>

          <div className="space-y-5">

            {recentRegistrations.map(reg => (

              <div
                key={reg._id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >

                <div>

                  <h4 className="font-semibold text-gray-900">
                    {reg.user.name}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {reg.event.title}
                  </p>

                </div>

                <Badge
                  type={
                    reg.status === "Approved"
                      ? "success"
                      : reg.status === "Pending"
                        ? "warning"
                        : "danger"
                  }
                >
                  {reg.status}
                </Badge>

              </div>

            ))}

          </div>

        </Card>

      </div>



      {/* Recent Activity */}
      <Card className="p-6">

        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Recent Activity
            </h3>

            <p className="text-sm text-gray-500">
              Latest actions across the platform
            </p>
          </div>
        </div>

        <div className="space-y-6">

          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="text-green-600" size={18} />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                Rahul Sharma registered as Volunteer
              </p>

              <p className="text-sm text-gray-500">
                Mega Food Drive • 5 minutes ago
              </p>
            </div>

          </div>


          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Calendar className="text-[#FF8C42]" size={18} />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                New Event Created
              </p>

              <p className="text-sm text-gray-500">
                Blood Donation Camp • 20 minutes ago
              </p>
            </div>

          </div>


          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <QrCode className="text-blue-600" size={18} />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                QR Check-in Successful
              </p>

              <p className="text-sm text-gray-500">
                Alice Smith checked in • 1 hour ago
              </p>
            </div>

          </div>


          <div className="flex items-start gap-4">

            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Award className="text-purple-600" size={18} />
            </div>

            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                Certificate Generated
              </p>

              <p className="text-sm text-gray-500">
                Volunteer Completion Certificate
              </p>
            </div>

          </div>

        </div>

      </Card>

    </div>
  );
};




export default AdminOverview;