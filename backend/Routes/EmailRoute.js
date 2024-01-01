import express, { Request, Response } from "express";
import { Resend } from "resend";
const router = express.Router();
const resend = new Resend("re_123456789");

router.get("/", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "hello world",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});
export default router;
