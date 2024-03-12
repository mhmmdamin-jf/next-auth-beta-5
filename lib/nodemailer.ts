import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  secure: false,
  auth: { user: "authentication234@gmail.com", pass: "swt.Lt!7S5hBK-E" },
});

export const sendEmail = async ({
  subject,
  token,
  reciever,
}: {
  subject?: string;
  token: string;
  reciever: string;
}) => {
  try {
    const resault = await transporter.sendMail({
      from: "authentication234",
      to: reciever,
      subject: subject,
      html: `<div><p>Click <a href={/new-verification?token=${token}}>here</a> to verify.</p></div>`,
    });
    console.log(resault);
  } catch (err) {
    console.log(err);
  }
};
