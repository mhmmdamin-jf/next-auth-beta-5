import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "./data";
import { db } from "./db";
export const generateTwoFactorToken = async (email: string) => {
  const code = crypto.randomInt(100_000, 1_000_000).toString();
  const exitingToken = await getTwoFactorTokenByEmail(email);
  if (exitingToken) {
    await db.twoFactorToken.delete({
      where: { id: exitingToken.id },
    });
  }

  return await db.twoFactorToken.create({
    data: { code, email, expires: new Date(Date.now() + 3600 * 1000) },
  });
};
