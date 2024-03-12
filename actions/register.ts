"use server";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/resend";

import { generateVerificationToken } from "@/lib/verification-token";
import { registerSchema } from "@/schemas";
import { hash } from "bcrypt";

export default async function Register(values: any) {
  if (!registerSchema.safeParse(values)) {
    return { error: "can't create user." };
  }
  const { email, name, password } = values;
  const dbClient = await db.user;
  const findEmail = await dbClient.findFirst({ where: { email } });
  if (findEmail) {
    return { error: "Email already in used." };
  }
  const hashed = await hash(password, 12);

  const resault = await dbClient.create({
    data: { name, email, password: hashed },
  });

  const token = await generateVerificationToken({ email });
  //await sendEmail();
  return {
    success: "user created successfully. Verfication link sent.",
    resault,
  };
}
