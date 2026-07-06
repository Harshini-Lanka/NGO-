import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  getRegistrations,
  updateRegistrationStatus,
  updateAttendance
} from "../../api/registrationApi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";

import {
  Search,
  DownloadCloud,
  Shield,
  Users,
  Check,
  X,
} from "lucide-react";




const AdminRegistrations = ({ showToast }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState('All');
  const [registrations, setRegistrations] = useState([]);

  const loadRegistrations = async () => {
    try {
      const res = await getRegistrations();
      setRegistrations(res.data.registrations);
    } catch (err) {
      console.error(err);
    }
  };


  const handleAttendance = async (id, status) => {

    try {

      await updateAttendance(id, status);

      showToast(
        `Marked ${status}`,
        "success"
      );

      loadRegistrations();

    } catch (err) {

      showToast(
        "Failed",
        "error"
      );

    }

  };


  const handleStatusUpdate = async (id, status) => {
    try {
      await updateRegistrationStatus(id, status);

      showToast(
        `Registration ${status}!`,
        "success"
      );

      loadRegistrations();

    } catch (err) {
      showToast(
        err.response?.data?.message || "Failed",
        "error"
      );
    }
  };
const exportToExcel = () => {

  const data = registrations.map((reg) => ({
  "Ticket ID": reg.ticketId,
  Name: reg.user?.name || "Unknown User",
  Email: reg.user.email,
  Phone: reg.user.phone,
  Event:reg.event?.title || "Event Deleted",
  Role: reg.role,
  People: reg.peopleCount,
  Status: reg.status,
  Attendance: reg.attendanceStatus || "Pending",
  "Emergency Contact": reg.emergencyContact || "-",
  Notes: reg.notes || "-",
}));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Registrations"
  );

  const today = new Date().toISOString().slice(0, 10);

  XLSX.writeFile(
    workbook,
    `Registrations-${today}.xlsx`
  );

  showToast("Excel exported successfully!", "success");

};
  useEffect(() => {
    loadRegistrations();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ticket ID or event..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF8C42]" />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#FF8C42] bg-white text-gray-700" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Participant">Participant</option>
            <option value="Volunteer">Volunteer</option>
          </select>
          <Button variant="outline" className="bg-white" onClick={exportToExcel}><DownloadCloud size={18} className="mr-2" /> Export</Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-100">
                <th className="p-4 font-semibold">Reg ID & Name</th>
                <th className="p-4 font-semibold">Event</th>
                <th className="p-4 font-semibold">Type & Count</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Attendance</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {
                registrations
                  .filter(reg => {
                    const matchesRole =
                      filter === "All" ||
                      reg.role.toLowerCase() === filter.toLowerCase();

                    const query = search.toLowerCase();

                    const matchesSearch =
                      reg.user.name.toLowerCase().includes(query) ||
                      reg.ticketId.toLowerCase().includes(query) ||
                      (reg.event?.title || "").toLowerCase().includes(query)

                    return matchesRole && matchesSearch;
                  })
                  .map(reg => (
                    <tr key={reg._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{reg.user?.name || "Unknown User"}</div>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{reg.ticketId}</div>
                      </td>
                      <td className="p-4 text-gray-600 font-medium">{reg.event?.title || "Event Deleted"}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {reg.role === "volunteer" ? (
                            <Shield size={14} className="text-[#FF8C42]" />
                          ) : (
                            <Users size={14} className="text-blue-500" />
                          )}
                          <span className="font-medium text-gray-700">{reg.role.charAt(0).toUpperCase() + reg.role.slice(1)}</span>
                        </div>
                        <div className="text-xs text-gray-500">1 Person </div>
                      </td>
                      <td className="p-4">
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
                      </td>
                      <td className="p-4">
                        <Badge
                          type={
                            reg.attendanceStatus === "Present"
                              ? "success"
                              : reg.attendanceStatus === "Absent"
                                ? "danger"
                                : "warning"
                          }
                        >
                          {reg.attendanceStatus}
                        </Badge>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {reg.status === 'Pending' && (
                          <button onClick={() =>
                            handleStatusUpdate(
                              reg._id,
                              "Approved"
                            )
                          } className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Approve"><Check size={16} /></button>
                        )}
                        {reg.status === "Pending" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(
                                reg._id,
                                "Rejected"
                              )
                            }
                            className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                            title="Reject"
                          >
                            ✕
                          </button>
                        )}
                        {reg.status === "Approved" &&
                          reg.attendanceStatus === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleAttendance(
                                    reg._id,
                                    "Present"
                                  )
                                }
                                className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg"
                                title="Present"
                              >
                                <Check size={16} />
                              </button>

                              <button
                                onClick={() =>
                                  handleAttendance(
                                    reg._id,
                                    "Absent"
                                  )
                                }
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg"
                                title="Absent"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminRegistrations;