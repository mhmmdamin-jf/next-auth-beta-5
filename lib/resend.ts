import { Resend } from "resend";

const resend = new Resend(process.env.Resend_Api_Key);
export const sendEmail = async () => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "neminesy@gmail.com",
    subject: "Hello World",
    html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  });
};
