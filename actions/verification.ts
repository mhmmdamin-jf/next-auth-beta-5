"use server";

import {
  deleteVerificationToken,
  getTokenByToken,
  getUserByEmail,
} from "@/lib/data";
import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";

export const verifyEmail = async (token: string) => {
  const exitingToken = await getTokenByToken(token);
  if (!exitingToken) {
    return { error: "token does not exist." };
  }
  if (exitingToken.expires < new Date(Date.now())) {
    return { error: "token has expierd." };
  }
  const exitingUser = await getUserByEmail(exitingToken.email);
  await db.user.update({
    where: { id: exitingUser?.id },
    data: { emailVerified: new Date(Date.now()), email: exitingToken.email },
  });
  await deleteVerificationToken(exitingToken.id);
  return { success: "email verified." };
};
