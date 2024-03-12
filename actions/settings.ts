"use server";
import { unstable_update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/verification-token";
import { settingsSchema } from "@/schemas";
import { compare, hash } from "bcryptjs";
import * as zod from "zod";
export const settings = async (values: zod.infer<typeof settingsSchema>) => {
  const exitingUser = await currentUser();
  if (!exitingUser || !exitingUser.id) {
    return { error: "unauthorized." };
  }
  const { id, email } = exitingUser;
  if (exitingUser.oauth) {
    values.password = undefined;
  }
  if (values.newPassword && exitingUser.password) {
    const compar = await compare(values.password, exitingUser.password);

    if (compar) {
      values.password = await hash(values.newPassword, 12);
      const updatedUser = await db.user.update({
        where: { id: exitingUser.id },
        data: {
          ...exitingUser,
          ...values,
          newPassword: undefined,
          oauth: undefined,
        },
      });
      unstable_update({
        user: {
          email: updatedUser.email,
          name: updatedUser.name,
          Role: updatedUser.Role,
          TwoFactorEnabled: updatedUser.TwoFactorEnabled,
        },
      });
      return { success: "information updated." };
    } else {
      return { error: "password in incorrect." };
    }
  }

  const updatedUser = await db.user.update({
    where: { id: id },
    data: {
      ...exitingUser,
      ...values,
      password: exitingUser.password,
      newPassword: undefined,
      oauth: undefined,
    },
  });

  unstable_update({
    user: {
      email: updatedUser.email,
      name: updatedUser.name,
      Role: updatedUser.Role,
      TwoFactorEnabled: updatedUser.TwoFactorEnabled,
    },
  });
  if (email !== values.email) {
    values.emailVerified = null;
    const verificationToken = await generateVerificationToken({
      email: values.email,
    });
    //send email

    return { success: "information updated. Verification link sent." };
  }
  return { success: "information updated." };
};
