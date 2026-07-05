import { jsPDF } from "jspdf";

export const generateTicketPDF = (registration) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("EKK KADAM FOUNDATION", 20, 20);

  doc.setFontSize(16);
  doc.text("Volunteer Event Pass", 20, 35);

  doc.line(20, 40, 190, 40);

  doc.setFontSize(12);

  doc.text(`Name: ${registration.user.name}`, 20, 55);
  doc.text(`Email: ${registration.user.email}`, 20, 65);

  doc.text(`Event: ${registration.event.title}`, 20, 75);

  doc.text(
    `Date: ${new Date(registration.event.date).toDateString()}`,
    20,
    85
  );

  doc.text(
    `Location: ${registration.event.location}`,
    20,
    95
  );

  doc.text(
    `Ticket ID: ${registration.ticketId}`,
    20,
    105
  );

  return doc;
};