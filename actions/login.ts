"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { Default_Redirect_Route } from "@/routes";
import {
  getTwoFactorConfirmationById,
  getTwoFactorTokenByEmail,
  getUserByEmail,
} from "@/lib/data";
import { generateVerificationToken } from "@/lib/verification-token";
import { generateTwoFactorToken } from "@/lib/two-factor-token";
import { db } from "@/lib/db";
import { generateTwoFactorConfirmation } from "@/lib/two-factor-confirmation";

export default async function login({
  values,
  provider = undefined,
  callBackUrl,
}: {
  values: any;
  provider?: "google" | "github";
  callBackUrl: string | null;
}) {
  if (provider) {
    await signIn(provider, {
      callbackUrl: callBackUrl || Default_Redirect_Route,
    });
  }
  const validateInputs = loginSchema.safeParse(values);
  if (!validateInputs.success) {
    return { error: "invalid Credentials." };
  }
  const { email, password, code } = validateInputs.data;
  const exitingUser = await getUserByEmail(email);
  if (!exitingUser) {
    return { error: "email not found." };
  }
  const { id, TwoFactorEnabled, emailVerified } = exitingUser;

  if (!emailVerified) {
    const token = await generateVerificationToken({ email: email });
    // await sendEmail();
    return { error: "email not verified yet. Confirmation link sent again." };
  }

  if (TwoFactorEnabled) {
    if (code && code !== "not entered") {
      const twoFactorToken = await getTwoFactorTokenByEmail(email);
      if (code !== twoFactorToken?.code || !twoFactorToken?.code) {
        return { error: "code is invalid." };
      }
      const hasExpired = twoFactorToken.expires < new Date(Date.now());
      if (hasExpired) {
        return { error: "2FA code has expired." };
      }
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });
      if (twoFactorToken.code !== code) {
        return { error: "code is incorrect." };
      }
      const exittingTwoFactorConfirmation =
        await getTwoFactorConfirmationById(id);

      if (exittingTwoFactorConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { userId: exittingTwoFactorConfirmation.userId },
        });
      }
      const twoFactorConfirmation = await generateTwoFactorConfirmation(email);
    } else {
      const twoFactorToken = await generateTwoFactorToken(email);
      //send mail
      return {
        twoFactor: true,
      };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || Default_Redirect_Route,
    });
    return { success: "logged in." };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          console.log(err);
          return { error: "invalid credentials." };
        default:
          return { error: err.message };
      }
    }
    throw err;
  }
}
