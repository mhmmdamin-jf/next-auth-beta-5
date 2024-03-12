"use server";
import { getUserByEmail } from "@/lib/data";
import { generateResetToken } from "@/lib/resetToken";
import { resetSchema } from "@/schemas";
import * as zod from "zod";
export const reset = async (values: zod.infer<typeof resetSchema>) => {
  const validateFields = resetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "invalid inputs;" };
  }
  const { email } = validateFields.data;
  const exitingUser = await getUserByEmail(email);
  if (!exitingUser || !exitingUser.password) {
    return { error: "user not found" };
  }
  try {
    const resetToken = generateResetToken(email);
    //send email
    return { success: "reset link sent." };
  } catch (err) {
    console.log(err);
  }
};
