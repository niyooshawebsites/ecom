import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const generateInvoice = (order, res) => {
  const doc = new PDFDocument();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const invoicePath = path.join(
    __dirname,
    "../invoices",
    `invoice-${order._id}.pdf`
  );

  // pipe the PDF into response
  doc.pipe(fs.createWriteStream(invoicePath)); // save locally
  doc.pipe(res); // send to client

  //   Header
  doc.fontSize(20).text("Invoice", { align: center });
  doc.moveDown();

  //   Order details
  doc.fontSize(20).text(`Order ID: ${order._id}`);
  doc.text(`Customer: ${order.customer.contactDetails.name}`);
  doc.text(`Email: $${order.customer.email}`);
  doc.moveDown();

  // Table Header
  doc.text("Products:", { underline: true });
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.name} - ${item.quantity} x $${item.price}`);
  });

  // Total Price
  doc.moveDown();
  doc.text(`Total: $${order.totalPrice}`, { bold: true });

  // End the PDF
  doc.end();
};

export default generateInvoice;
