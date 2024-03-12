"use server";
import * as zod from "zod";
import { hash } from "bcryptjs";
import { newPasswordSchema } from "@/schemas/index";
import {
  deleteResetToken,
  getResetTokenByToken,
  getUserByEmail,
} from "@/lib/data";
import { db } from "@/lib/db";

export const newPassword = async (
  values: zod.infer<typeof newPasswordSchema>,
  token: string,
) => {
  const validateInputs = newPasswordSchema.safeParse(values);
  if (!validateInputs.success) {
    return { error: "invalid inputs." };
  }
  if (!token) {
    return { error: "token not found." };
  }
  const { password } = values;
  try {
    const exitingToken = await getResetTokenByToken(token);
    if (!exitingToken) {
      return { error: "token is not valid." };
    }
    const exitingUser = await getUserByEmail(exitingToken.email);
    if (!exitingUser?.email) {
      return { error: "email does not exist." };
    }
    const hashed = await hash(password, 12);
    await db.user.update({
      where: { email: exitingUser.email },
      data: { password: hashed },
    });

    await deleteResetToken(exitingToken.id);
    return { success: "password changed." };
  } catch (err) {
    console.log(err);
  }
};
