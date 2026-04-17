const Razorpay = require('razorpay');
import crypto from 'crypto';

const isRazorpayConfigured = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

const razorpay = isRazorpayConfigured ? new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
}) : null;

export class RazorpayService {
  static async createOrder(amount: number, invoiceId: string) {
    if (!isRazorpayConfigured) {
      console.warn("⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing. Returning mock order.");
      return { id: "order_mock_" + Math.random().toString(36).slice(2, 11) };
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: "INR",
      receipt: invoiceId,
      notes: {
        invoice_id: invoiceId,
      }
    };

    try {
      const order = await razorpay.orders.create(options);
      return order;
    } catch (error) {
      console.error("Razorpay Order Creation Error:", error);
      throw error;
    }
  }

  static verifyWebhookSignature(payload: string, signature: string, secret: string) {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    return expectedSignature === signature;
  }
}
