import axios from "axios";
import { toast } from "react-toastify";

const handlePayment = async () => {
  try {
    // 1️⃣ Step 1: Create order on backend
    const razorpayOrderRes = await axios.post(
      `http://localhost:8000/api/v1/create-razorpay-order`,
      { amount: 64996, currency: "INR" }, // Amount in INR (649.96 INR)
      { withCredentials: true }
    );

    if (!razorpayOrderRes.data.success) {
      toast.error("Failed to create Razorpay order");
      return;
    }

    const { id: order_id, amount, currency } = razorpayOrderRes.data.data;
    console.log("Razorpay Order Created:", order_id);

    // 2️⃣ Step 2: Open Razorpay checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Your Razorpay Public Key
      amount: amount, // Amount in paise
      currency: currency,
      name: "Your App Name",
      description: "Test Transaction",
      order_id: order_id, // ✅ This is required for signature generation
      handler: async function (response) {
        console.log("Razorpay Payment Response:", response);

        // Extract the payment details
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        if (!razorpay_signature) {
          toast.error("Payment failed or signature missing!");
          return;
        }

        // 3️⃣ Step 3: Verify payment on backend
        try {
          const paymentVerificationRes = await axios.post(
            `http://localhost:8000/api/v1/verify-razorpay-payment`,
            {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
            },
            { withCredentials: true }
          );

          if (paymentVerificationRes.data.success) {
            toast.success("Payment verified successfully!");
          } else {
            toast.error("Payment verification failed!");
          }
        } catch (err) {
          console.error("Verification Error:", err.message);
          toast.error(err.response?.data?.msg || "Payment verification error");
        }
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Payment error:", err.message);
    toast.error("Something went wrong while processing the payment.");
  }
};
