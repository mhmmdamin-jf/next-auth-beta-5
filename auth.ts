import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import {
  getAccountByUserId,
  getTwoFactorConfirmationById,
  getUserByEmail,
} from "./lib/data";
import { UserRole } from "@prisma/client";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: { error: "/error", newUser: "/register", signIn: "/login" },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type !== "credentials") {
        return true;
      }
      if (user.email) {
        const exitingUser = await getUserByEmail(user.email);
        if (!exitingUser) {
          return false;
        }
        if (!exitingUser.password || !exitingUser.emailVerified) {
          return false;
        }
        if (exitingUser.TwoFactorEnabled) {
          const exitingTwoFactor = await getTwoFactorConfirmationById(
            exitingUser.id,
          );
          if (!exitingTwoFactor) {
            return false;
          }
        }
        return true;
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      if (token.email) {
        const foundedUser = await getUserByEmail(token.email);
        if (!foundedUser) {
          return token;
        }
        if (foundedUser.password) {
          token.password = foundedUser.password;
        }
        if (foundedUser) {
          token.Role = foundedUser?.Role;
          token.TwoFactorEnabled = foundedUser?.TwoFactorEnabled;
        }
        token.oauth = false;
        const exitingAccount = await getAccountByUserId(foundedUser.id);
        if (exitingAccount) {
          token.oauth = true;
        }
      }
      return token;
    },
    async session({ session, token: sessionToken }) {
      if (sessionToken) {
        session.user.Role = sessionToken.Role as UserRole;
        session.user.name = sessionToken.name;
        session.user.TwoFactorEnabled =
          sessionToken.TwoFactorEnabled as boolean;
        session.user.oauth = sessionToken.oauth as boolean;
        session.user.password = sessionToken.password as string;
      }
      if (sessionToken.sub) {
        session.user.id = sessionToken.sub;
      }
      return session;
    },
  },
});
