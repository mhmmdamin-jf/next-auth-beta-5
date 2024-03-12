import { v4 as uuidV4 } from "uuid";
import { deleteVerificationToken, getTokenByEmail } from "./data";
import { db } from "./db";

export const generateVerificationToken = async ({
  email,
}: {
  email: string;
}) => {
  const token = uuidV4();
  const exitingToken = await getTokenByEmail(email);
  if (exitingToken) {
    await deleteVerificationToken(exitingToken.id);
  }
  const expireDate = new Date(Date.now() + 3600 * 1000);
  return await db.verificationToken.create({
    data: { email: email, expires: expireDate, token: token },
  });
};
