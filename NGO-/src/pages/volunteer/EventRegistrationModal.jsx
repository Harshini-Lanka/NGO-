import jsPDF from "jspdf";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import React, { useState } from "react";

import { registerForEvent } from "../../api/registrationApi";

import {
  Calendar,
  X,
  DownloadCloud,
  Check
} from "lucide-react";


const EventRegistrationModal = ({ event, onClose }) => {
  const [step, setStep] = useState('form');
  const [regId, setRegId] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: 'Participant', count: 1, emergency: '', notes: ''
  });
  const [ticketId, setTicketId] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerForEvent({
        eventId: event._id,
        emergencyContact: formData.emergency,
        notes: formData.notes,
        peopleCount: formData.count,
      });

      const registration = res.data.registration;

      setRegId(registration._id);
      setTicketId(registration.ticketId);
      setQrCode(registration.qrCode);

      setStep("success");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Registration failed"
      );
    }
  };
  const handleDownloadPDF = async () => {

    const doc = new jsPDF();



    // Header
    doc.setFillColor(255, 140, 66);
    doc.rect(0, 0, 210, 35, "F");

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("EKK KADAM FOUNDATION", 105, 16, { align: "center" });

    doc.setFontSize(15);
    doc.text("EVENT ENTRY PASS", 105, 26, { align: "center" });

    // White Ticket
    doc.setFillColor(248, 248, 248);
    doc.roundedRect(10, 45, 190, 210, 5, 5, "F");

    // QR
    doc.addImage(qrCode, "PNG", 145, 60, 45, 45);
    doc.setTextColor(40);

    doc.setFontSize(18);
    doc.text(formData.name, 20, 65);

    doc.setFontSize(13);
    doc.text(formData.type, 20, 75);

    doc.setDrawColor(220);
    doc.line(20, 82, 135, 82);

    doc.setFontSize(12);

    doc.text(`Ticket ID`, 20, 95);
    doc.text(ticketId, 70, 95);

    doc.text(`Registration`, 20, 107);
    doc.text(regId, 70, 107);

    doc.text(`Event`, 20, 119);
    doc.text(event.title, 70, 119);

    doc.text(`Date`, 20, 131);
    doc.text(
      new Date(event.date).toLocaleDateString(),
      70,
      131
    );

    doc.text(`Time`, 20, 143);
    doc.text(event.time, 70, 143);

    doc.text(`Venue`, 20, 155);
    doc.text(event.location, 70, 155);

    doc.text(`People`, 20, 167);
    doc.text(formData.count.toString(), 70, 167);

    // Status
    doc.setFillColor(76, 175, 80);
    doc.roundedRect(20, 185, 70, 12, 3, 3, "F");

    doc.setTextColor(255);
    doc.text("CONFIRMED", 55, 193, { align: "center" });

    doc.setTextColor(120);

    doc.setFontSize(10);

    doc.text(
      "Carry this ticket during check-in. QR Code is unique for every registration.",
      20,
      215
    );

    doc.text(
      "Thank you for supporting Ekk Kadam Foundation ❤️",
      20,
      225
    );

    doc.save(`${ticketId}.pdf`);

  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto relative animate-bounce-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full p-1.5"><X size={20} /></button>

        {step === 'form' ? (
          <div className="p-6 md:p-8">
            <div className="mb-6 pr-8">
              <Badge type="primary">{event.category}</Badge>
              <h2 className="text-2xl font-bold text-gray-900 mt-3 leading-tight">{event.title}</h2>
              <p className="text-sm text-gray-500 mt-2 flex items-center gap-2"><Calendar size={14} /> {event.date} at {event.time}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none transition-shadow" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none transition-shadow" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none transition-shadow" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration Type</label>
                  <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none bg-white transition-shadow">
                    <option value="Participant">Participant</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                  <input type="number" min="1" value={formData.count} onChange={e => setFormData({ ...formData, count: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none transition-shadow" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact (Optional)</label>
                  <input type="tel" value={formData.emergency} onChange={e => setFormData({ ...formData, emergency: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none transition-shadow" placeholder="Name - Phone Number" />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                  <textarea rows="2" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none resize-none transition-shadow" placeholder="Dietary requirements, special needs, etc."></textarea>
                </div>
              </div>
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Button type="submit" className="w-full py-3 text-base">Confirm Registration</Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-[#4CAF50] mb-4 shadow-inner">
              <Check size={32} strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="text-gray-500 mb-6 max-w-sm">You're all set for the {event.title}. We've sent a confirmation to your email.</p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 w-full mb-6">
              <p className="text-sm text-gray-500 mb-1">Your Registration ID</p>
              <p className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                {ticketId}
              </p>

            </div>

            <div className="flex gap-3 w-full">
              <Button variant="outline" className="flex-1 py-2.5" onClick={onClose}>Close</Button>
              <Button className="flex-1 py-2.5 bg-[#4CAF50] hover:bg-[#439c47] shadow-[#4CAF50]/30" onClick={handleDownloadPDF}>
                <DownloadCloud size={18} className="mr-2" /> Save PDF
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};



export default EventRegistrationModal;