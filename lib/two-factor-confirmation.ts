import { signIn } from "@/auth";
import { getUserByEmail } from "./data";
import { Default_Redirect_Route } from "@/routes";
import { db } from "./db";

export const generateTwoFactorConfirmation = async (email: string) => {
  const exitingUser = await getUserByEmail(email);
  try {
    if (!exitingUser || !exitingUser.password) {
      throw new Error("cant find user by email.");
    }
    const { id } = exitingUser;
    await db.twoFactorConfirmation.create({
      data: { userId: id },
    });
  } catch (err) {
    console.log(err);
  }
};
