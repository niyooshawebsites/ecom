import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateInvoice = (order, user, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Ensure invoices directory exists
  const invoicesDir = path.join(__dirname, "../invoices");
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const invoicePath = path.join(invoicesDir, `invoice-${order._id}.pdf`);
  doc.pipe(fs.createWriteStream(invoicePath)); // Save locally
  doc.pipe(res); // Send to client

  // 1️⃣ Add Company Logo (Adjust the Path)
  const logoPath = path.join(__dirname, "../assets/company-logo.png");
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 220, 40, { width: 150 }); // Adjust size & position
  }

  // 2️⃣ Invoice Title (Centered)
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("INVOICE", { align: "center", underline: true });
  doc.moveDown(1);

  // 3️⃣ Customer & Order Details
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Customer Details:", { underline: true });
  doc
    .font("Helvetica")
    .text(
      `Name: ${order.customer?.contactDetails?.fName} ${order.customer?.contactDetails?.lName}`
    );
  doc.text(`Email: ${order.customer?.email}`);
  doc.text(`Contact No: ${order.customer?.contactDetails?.contactNo}`);
  doc.text(`Invoice ID: ${order._id}`);
  doc.text(`Order ID: ${order._id}`);
  doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`);
  doc.moveDown(2);

  // 4️⃣ Order Table Header
  doc
    .fontSize(11)
    .font("Helvetica-Bold")
    .text("Order Summary:", { underline: true });
  doc.moveDown(0.5);

  const tableTop = doc.y;
  const columnWidths = [120, 50, 60, 70, 65, 80];

  // Draw table header background
  doc.rect(50, tableTop, 510, 20).fill("#e0e0e0").stroke();
  doc.fillColor("black");

  const headers = ["Product", "Qty", "Price", "Total", "GST", "Grand Total"];
  let xPos = 50;
  headers.forEach((header, i) => {
    doc.text(header, xPos, tableTop + 5, {
      width: columnWidths[i],
      align: "center",
    });
    xPos += columnWidths[i];
  });

  doc.moveDown(1);
  doc.stroke();

  // 5️⃣ Order Data (Single Order)
  doc.font("Helvetica");
  let yPos = tableTop + 25;
  const total = order.quantity * order.product?.price;
  const gst = order.GST; // GST is 18% of the total price
  const grandTotal = order.orderValue;

  doc.rect(50, yPos, 510, 20).stroke();
  xPos = 50;
  const rowData = [
    order.product?.name,
    order.quantity,
    `Rs ${order.product?.price.toFixed(2)}`,
    `Rs ${total.toFixed(2)}`,
    `Rs ${gst.toFixed(2)}`, // GST value
    `Rs ${grandTotal.toFixed(2)}`,
  ];

  rowData.forEach((data, i) => {
    doc.text(data, xPos, yPos + 5, { width: columnWidths[i], align: "center" });
    xPos += columnWidths[i];
  });
  doc.moveDown(3);

  // 6️⃣ Fix Company Details at Bottom (Like CSS Position Fixed)
  const bottomY = doc.page.height - 120; // Adjusted to make room for GST number

  doc
    .fontSize(12)
    .font("Helvetica-Bold")
    .text(`${user.contactDetails.bName}`, 50, bottomY, {
      align: "center",
      width: 510,
      underline: true,
    });

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`${user.contactDetails.website} | ${user.email}`, 50, bottomY + 15, {
      align: "center",
      width: 510,
    });

  // Add GST Number
  if (user.contactDetails.GSTNo) {
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`GST No: ${user.contactDetails.GSTNo}`, 50, bottomY + 30, {
        align: "center",
        width: 510,
      });
  }

  // Finalize PDF
  doc.end();
};

export default generateInvoice;
