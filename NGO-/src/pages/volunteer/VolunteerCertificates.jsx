import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import logo from "/images/logo.png";
import {
  Award,
  Calendar,
  MapPin,
  DownloadCloud,
  CheckCircle,
} from "lucide-react";

import { getMyCertificates } from "../../api/registrationApi";
import jsPDF from "jspdf";



const capitalizeWords = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};
const VolunteerCertificates = () => {
  const [certificates, setCertificates] = useState([]);

  const loadCertificates = async () => {
    try {
      const res = await getMyCertificates();
      setCertificates(res.data.certificates);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const downloadCertificate = (certificate) => {
    const doc = new jsPDF("landscape");

    // Border
    doc.setDrawColor(255, 140, 66);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Logo
doc.addImage(
  logo,
  "PNG",
  128,
  12,
  40,
  40
);

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(28);
    doc.setTextColor(255, 140, 66);

    doc.text(
      "CERTIFICATE OF APPRECIATION",
      148,
      60,
      { align: "center" }
    );

    doc.setTextColor(40);

    doc.setFontSize(16);

    doc.text(
      "This certificate is proudly presented to",
      148,
      78,
      { align: "center" }
    );

    doc.setFontSize(30);
    doc.setFont("times", "bold");

    doc.text(
      capitalizeWords(certificate.user.name),
      148,
      98,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);

    doc.text(
      "for successfully participating in",
      148,
      116,
      { align: "center" }
    );

    doc.setFont("times", "bold");
    doc.setFontSize(22);

    doc.text(
     capitalizeWords( certificate.event.title),
      148,
      136,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);

    doc.text(
      `Held on ${new Date(
       capitalizeWords( certificate.event.date)
      ).toLocaleDateString()}`,
      148,
      150,
      { align: "center" }
    );

    doc.text(
      certificate.event.location,
      148,
      162,
      { align: "center" }
    );

    doc.setFontSize(18);

    doc.text(
      "EKK KADAM FOUNDATION",
      148,
      178,
      { align: "center" }
    );

    doc.setFontSize(11);

    doc.text(
      "Thank you for your valuable contribution towards building a better community.",
      148,
      190,
      { align: "center" }
    );

    doc.save(
      `${certificate.event.title}-Certificate.pdf`
    );
  };

  return (
    <div className="space-y-8">

      {/* Banner */}

      <Card className="bg-gradient-to-r from-[#FF8C42] to-orange-400 text-white p-8 overflow-hidden relative">

        <div className="relative z-10">

          <h2 className="text-3xl font-bold">
            🏆 My Certificates
          </h2>

          <p className="mt-2 text-orange-100 max-w-xl">
            Celebrate your contribution to Ekk Kadam Foundation.
            Download your verified participation certificates.
          </p>

          <div className="mt-6 inline-flex items-center gap-4 bg-white/20 backdrop-blur-sm rounded-xl px-5 py-3">

            <Award size={36} />

            <div>

              <p className="text-sm text-orange-100">
                Certificates Earned
              </p>

              <h3 className="text-3xl font-bold">
                {certificates.length}
              </h3>

            </div>

          </div>

        </div>

      </Card>

      {/* Empty State */}

      {certificates.length === 0 ? (

        <Card className="p-12 text-center">

          <div className="text-7xl mb-5">
            🏅
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            No Certificates Yet
          </h3>

          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Attend an event, get approved and marked present.
            Your certificates will automatically appear here.
          </p>

        </Card>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {certificates.map((certificate) => (

            <Card
              key={certificate._id}
              hover
              className="p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <div className="flex items-center gap-2 mb-3">

                    <Award
                      size={22}
                      className="text-[#FF8C42]"
                    />

                    <h3 className="text-xl font-bold">
                      Certificate of Appreciation
                    </h3>

                  </div>

                  <p className="text-lg font-semibold text-gray-800">
                    {certificate.event.title}
                  </p>

                  <div className="mt-4 space-y-2 text-gray-600">

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(
                        certificate.event.date
                      ).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {certificate.event.location}
                    </div>

                  </div>

                </div>

                <Badge type="success">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} />
                    Verified
                  </div>
                </Badge>

              </div>

              <Button
                className="w-full mt-6"
                onClick={() =>
                  downloadCertificate(certificate)
                }
              >
                <DownloadCloud
                  size={18}
                  className="mr-2"
                />
                Download Certificate
              </Button>

            </Card>

          ))}

        </div>

      )}

    </div>
  );
};

export default VolunteerCertificates;