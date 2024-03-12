import { v4 as uuidV4 } from "uuid";
import { deleteResetToken, getResetTokenByEmail } from "./data";
import { db } from "./db";
export const generateResetToken = async (email: string) => {
  const exitingResetToken = await getResetTokenByEmail(email);
  if (exitingResetToken) {
    await deleteResetToken(exitingResetToken.id);
  }
  const token = uuidV4();
  try {
    return await db.resetPasswordtoken.create({
      data: { token, email, expires: new Date(Date.now() + 3600 * 1000) },
    });
  } catch (err) {
    console.log(err);
  }
};
