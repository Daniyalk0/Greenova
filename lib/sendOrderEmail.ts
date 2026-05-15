import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

type Props = {
  email: string;
  order: any;
  items: any[];
  address: any;
};

export async function sendOrderConfirmationEmail({
  email,
  order,
  items,
  address,
}: Props) {
 const itemsHtml = items
  .map((item) => {
  const productName =
  item.product?.name || "Product";

    const hasDiscount =
      item.discountPercent && item.discountPercent > 0;

    return `
      <tr>
        <td
          style="
            padding: 16px 0;
            border-bottom: 1px solid #f1f1f1;
          "
        >
          <div
            style="
              font-size: 15px;
              font-weight: 600;
              color: #111827;
            "
          >
            ${productName}
          </div>

          <div
            style="
              margin-top: 6px;
              font-size: 13px;
              color: #6b7280;
            "
          >
            Weight: ${item.weight}kg
          </div>

          ${
            hasDiscount
              ? `
                <div
                  style="
                    margin-top: 4px;
                    font-size: 12px;
                    color: #9ca3af;
                  "
                >
                  <span style="text-decoration: line-through;">
                    ₹${item.originalPrice}
                  </span>

                  <span
                    style="
                      margin-left: 6px;
                      color: #0c831f;
                      font-weight: 600;
                    "
                  >
                    ${item.discountPercent}% OFF
                  </span>
                </div>
              `
              : ""
          }
        </td>

        <td
          align="right"
          style="
            padding: 16px 0;
            border-bottom: 1px solid #f1f1f1;
          "
        >
          <div
            style="
              font-size: 16px;
              font-weight: 700;
              color: #111827;
            "
          >
            ₹${item.lineTotal}
          </div>

          <div
            style="
              margin-top: 4px;
              font-size: 12px;
              color: #6b7280;
            "
          >
            ₹${item.discountedPrice}/kg
          </div>
        </td>
      </tr>
    `;
  })
  .join("");
  await transporter.sendMail({
    from: `"Greenova" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Your Order #${order.id} Has Been Confirmed`,
    html: `
      <div
        style="
          margin: 0;
          padding: 30px 16px;
          background: #f5f5f5;
          font-family: Arial, sans-serif;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            max-width: 620px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 18px;
            overflow: hidden;
          "
        >
          <!-- Header -->
          <tr>
            <td
              style="
                background: #0c831f;
                padding: 28px 24px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: white;
                  font-size: 28px;
                  font-weight: 700;
                "
              >
                Order Confirmed
              </h1>

              <p
                style="
                  margin: 10px 0 0;
                  color: rgba(255,255,255,0.9);
                  font-size: 14px;
                "
              >
                Thank you for shopping with us
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 28px 24px;">
              <p
                style="
                  margin: 0 0 18px;
                  font-size: 15px;
                  color: #374151;
                  line-height: 1.7;
                "
              >
                Hi <strong>${address.name}</strong>,
                your order has been successfully placed and is now being processed.
              </p>

              <!-- Order Info -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="
                  background: #f9fafb;
                  border-radius: 12px;
                  padding: 16px;
                  margin-bottom: 26px;
                "
              >
                <tr>
                  <td style="padding-bottom: 10px;">
                    <span style="color: #6b7280; font-size: 13px;">
                      Order ID
                    </span>

                    <div
                      style="
                        margin-top: 3px;
                        font-size: 15px;
                        font-weight: 600;
                        color: #111827;
                      "
                    >
                      #${order.id}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span style="color: #6b7280; font-size: 13px;">
                      Payment Status
                    </span>

                    <div
                      style="
                        margin-top: 3px;
                        font-size: 15px;
                        font-weight: 600;
                        color: #0c831f;
                      "
                    >
                      ${order.status}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Items -->
              <h2
                style="
                  margin: 0 0 18px;
                  font-size: 18px;
                  color: #111827;
                "
              >
                Order Summary
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0">
                ${itemsHtml}
              </table>

              <!-- Total -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                style="margin-top: 18px;"
              >
                <tr>
                  <td
                    style="
                      padding-top: 12px;
                      font-size: 16px;
                      font-weight: 600;
                      color: #111827;
                    "
                  >
                    Total Amount
                  </td>

                  <td
                    align="right"
                    style="
                      padding-top: 12px;
                      font-size: 22px;
                      font-weight: 700;
                      color: #0c831f;
                    "
                  >
                    ₹${Number(order.total)}
                  </td>
                </tr>
              </table>

              <!-- Address -->
              <div
                style="
                  margin-top: 32px;
                  padding: 18px;
                  background: #f9fafb;
                  border-radius: 12px;
                "
              >
                <h3
                  style="
                    margin: 0 0 10px;
                    font-size: 16px;
                    color: #111827;
                  "
                >
                  Delivery Address
                </h3>

                <p
                  style="
                    margin: 0;
                    color: #4b5563;
                    font-size: 14px;
                    line-height: 1.8;
                  "
                >
                  ${address.name}<br />
                  ${address.street}<br />
                  ${address.city}, ${address.state} - ${address.pincode}<br />
                  Phone: ${address.phone}
                </p>
              </div>

              <!-- Footer -->
              <p
                style="
                  margin: 32px 0 0;
                  font-size: 13px;
                  color: #9ca3af;
                  text-align: center;
                  line-height: 1.6;
                "
              >
                If you have any questions regarding your order,
                feel free to contact our support team.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
}