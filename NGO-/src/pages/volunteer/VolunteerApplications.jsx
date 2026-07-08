import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import {
  Calendar,
  MapPin,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";


import { getMyRegistrations } from "../../api/registrationApi";

const VolunteerApplications = () => {

  const [applications, setApplications] = useState([]);

  const loadApplications = async () => {
    try {

      const res = await getMyRegistrations();

      setApplications(res.data.registrations);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        My Applications
      </h2>

      {applications.length === 0 ? (

        <Card className="p-10 text-center text-gray-500">
          You haven't registered for any events yet.
        </Card>

      ) : (

        <div className="grid gap-4">

          {applications.map((app) => (

            <Card
              key={app._id}
              className="p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold text-lg">
                    {app.event.title}
                  </h3>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <Calendar size={16}/>
                    {new Date(app.event.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <MapPin size={16}/>
                    {app.event.location}
                  </div>
<div className="mt-4 grid grid-cols-2 gap-4 text-sm">

  <div>
    <p className="text-gray-500">
      Ticket ID
    </p>
    <p className="font-mono font-semibold">
      {app.ticketId}
    </p>
  </div>

  <div>
    <p className="text-gray-500">
      Role
    </p>
    <p className="font-semibold capitalize">
      {app.role}
    </p>
  </div>

</div>
                 

                 <div className="mt-3 flex items-center gap-2">
  <span className="text-gray-500 font-medium">
    Attendance:
  </span>

  <Badge
    type={
      app.attendanceStatus === "Present"
        ? "success"
        : app.attendanceStatus === "Absent"
        ? "danger"
        : "warning"
    }
  >
    {app.attendanceStatus}
  </Badge>
</div>
                 <div className="mt-3 text-sm text-gray-500">
  Applied on{" "}
  {new Date(app.createdAt).toLocaleDateString()}
</div>



                </div>

                <div>
  {app.status === "Approved" && (
    <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
      <CheckCircle size={16} />
      Approved
    </div>
  )}

  {app.status === "Pending" && (
    <div className="flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full font-semibold text-sm">
      <Clock3 size={16} />
      Pending Review
    </div>
  )}

  {app.status === "Rejected" && (
    <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm">
      <XCircle size={16} />
      Rejected
    </div>
  )}
</div>

              </div>

            </Card>

          ))}

        </div>

      )}

    </div>
  );

};

export default VolunteerApplications;