import { db } from "./db";
export const getUserByEmail = async (email: string) =>
  db.user.findUnique({ where: { email } });
export const getUserById = async (id: string) =>
  db.user.findUnique({ where: { id } });
export const getTokenByEmail = (email: string) =>
  db.verificationToken.findFirst({ where: { email } });
export const getTokenByToken = (token: string) =>
  db.verificationToken.findFirst({ where: { token } });
export const deleteVerificationToken = async (tokenId: string) =>
  await db.verificationToken.delete({ where: { id: tokenId } });
export const getResetTokenByEmail = async (email: string) =>
  await db.resetPasswordtoken.findFirst({ where: { email: email } });
export const getResetTokenByToken = async (token: string) =>
  await db.resetPasswordtoken.findFirst({ where: { token: token } });
export const deleteResetToken = async (tokenId: string) =>
  await db.resetPasswordtoken.delete({ where: { id: tokenId } });
export const getTwoFactorConfirmationById = async (id: string) =>
  await db.twoFactorConfirmation.findUnique({ where: { userId: id } });
export const deleteTwoFactorConfirmationToken = async (userId: string) =>
  await db.twoFactorConfirmation.delete({ where: { userId: userId } });
export const getTwoFactorTokenByEmail = async (email: string) =>
  await db.twoFactorToken.findFirst({ where: { email: email } });
export const getTwoFactorTokenByToken = async (code: string) =>
  await db.twoFactorToken.findFirst({ where: { code: code } });
export const getAccountByUserId = async (userId: string) =>
  await db.account.findFirst({ where: { userId } });
