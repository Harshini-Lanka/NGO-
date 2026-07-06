import React from "react";
import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getNeedsAttention,
  getMonthlyRegistrations,
} from "../../api/adminApi";

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

  Award,

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



const AdminOverview = () => {

  const [stats, setStats] = useState(null);

  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [needsAttention, setNeedsAttention] = useState(null);
  const [chartData, setChartData] = useState([]);


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

    const statsRes = await getDashboardStats();

    setStats(statsRes.data.stats);

    const attentionRes =
      await getNeedsAttention();

    setNeedsAttention(
      attentionRes.data.needsAttention
    );

    const chartRes =
  await getMonthlyRegistrations();

setChartData(
  chartRes.data.chartData
);

  }

  catch (err) {

    console.error(err);

  }

};

  if (!stats || !needsAttention) {

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
      <div className="grid grid-cols-1">

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
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />

                <Line
  type="monotone"
  dataKey="registrations"
  stroke="#FF8C42"
  strokeWidth={3}
/>

            
            </LineChart>
          </ResponsiveContainer>
        </Card>



      </div>







      {/* Recent Registrations + Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

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

            {recentRegistrations.map((reg) => (

              <div
                key={reg._id}
                className="flex items-center justify-between border-b border-gray-100 pb-4"
              >

                <div>
  <h4 className="font-semibold text-gray-900">
    {reg.user?.name || "Unknown User"}
  </h4>

  <p className="text-sm text-gray-500">
    {reg.event?.title || "Event Deleted"}
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

        {/* Recent Activity */}
        <Card className="p-6">

  <div className="mb-6">

    <h3 className="text-xl font-bold">
      Needs Attention
    </h3>

    <p className="text-gray-500 text-sm">
      Things requiring your attention
    </p>

  </div>

  <div className="space-y-5">

    <div className="flex justify-between items-center">

      <span className="font-medium">
        Pending Registrations
      </span>

      <Badge type="warning">
        {needsAttention.pendingRegistrations}
      </Badge>

    </div>

    {needsAttention.upcomingEvents.map(event => (

      <div
        key={event._id}
        className="border-t pt-3"
      >

        <p className="font-semibold">
          {event.title}
        </p>

        <p className="text-sm text-gray-500">
          Upcoming Event
        </p>

      </div>

    ))}

    {needsAttention.almostFullEvents.map(event => (

      <div
        key={event._id}
        className="border-t pt-3"
      >

        <p className="font-semibold">
          {event.title}
        </p>

        <p className="text-sm text-orange-500">
          Volunteer slots almost full
        </p>

      </div>

    ))}

  </div>

</Card>





      </div>



    </div >
  );
};




export default AdminOverview;