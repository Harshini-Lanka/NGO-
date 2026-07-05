import React, { useEffect, useState } from "react";

import Card from "../../components/Card";
import Button from "../../components/Button";
import { getMyCertificates } from "../../api/registrationApi";

import jsPDF from "jspdf";

const VolunteerCertificates = () => {

    const [certificates, setCertificates] = useState([]);



    const downloadCertificate = (certificate) => {

        const doc = new jsPDF("landscape");

        doc.setFontSize(26);
        doc.setFont("helvetica", "bold");

        doc.text(
            "Certificate of Appreciation",
            148,
            40,
            { align: "center" }
        );

        doc.setFontSize(16);
        doc.setFont("helvetica", "normal");

        doc.text(
            "This certificate is proudly presented to",
            148,
            70,
            { align: "center" }
        );

        doc.setFontSize(24);
        doc.setFont("times", "bold");

        doc.text(
            certificate.user.name,
            148,
            95,
            { align: "center" }
        );

        doc.setFontSize(16);

        doc.text(
            `for successfully participating in`,
            148,
            120,
            { align: "center" }
        );

        doc.setFontSize(20);

        doc.text(
            certificate.event.title,
            148,
            140,
            { align: "center" }
        );

        doc.setFontSize(14);

        doc.text(
            `Date: ${new Date(certificate.event.date).toLocaleDateString()}`,
            148,
            170,
            { align: "center" }
        );

        doc.text(
            "Ekk Kadam Foundation",
            148,
            190,
            { align: "center" }
        );

        doc.save(
            `${certificate.event.title}-Certificate.pdf`
        );

    };

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



    return (
        <div className="space-y-6">

            <h2 className="text-2xl font-bold">
                Certificates
            </h2>

            {certificates.length === 0 ? (

                <Card className="p-10 text-center">

                    <h3 className="text-xl font-semibold">
                        No Certificates Yet
                    </h3>

                    <p className="text-gray-500 mt-3">
                        Certificates will appear here once you successfully
                        complete an event.
                    </p>

                </Card>

            ) : (

                <div className="grid gap-4">

                    {certificates.map((certificate) => (

                        <Card
                            key={certificate._id}
                            className="p-6 flex justify-between items-center"
                        >

                            <div>

                                <h3 className="text-xl font-bold">
                                    {certificate.event.title}
                                </h3>

                                <p className="text-gray-500 mt-2">
                                    {new Date(
                                        certificate.event.date
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <Button
                                onClick={() =>
                                    downloadCertificate(certificate)
                                }
                            >
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