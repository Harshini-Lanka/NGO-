import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import Button from "../../components/Button";

import { Calendar, MapPin } from "lucide-react";

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

                  <div className="mt-3 font-mono text-sm">
                    Ticket : {app.ticketId}
                  </div>

                </div>

                <Badge
                  type={
                    app.status==="Approved"
                    ?"success"
                    :app.status==="Pending"
                    ?"warning"
                    :"danger"
                  }
                >
                  {app.status}
                </Badge>

              </div>

            </Card>

          ))}

        </div>

      )}

    </div>
  );

};

export default VolunteerApplications;