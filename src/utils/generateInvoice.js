import jsPDF from "jspdf";

export const generateInvoice = (job) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("GutterFlow - Invoice", 20, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${job.name}`, 20, 40);
  doc.text(`Phone: ${job.phone}`, 20, 50);
  doc.text(`Address: ${job.address}`, 20, 60);
  doc.text(`Service: Gutter Cleaning`, 20, 70);
  doc.text(`Amount Paid: $${job.amount || "0"}`, 20, 80);
  doc.text(`Payment Method: ${job.payment || "Cash"}`, 20, 90);

  doc.text("Thank you for choosing GutterFlow!", 20, 120);

  doc.save(`invoice-${job.name}.pdf`);
};
