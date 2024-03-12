import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./lib/data";
import { compare } from "bcryptjs";

export default {
  providers: [
    credentials({
      async authorize(values) {
        const ValidParameters = loginSchema.safeParse(values);
        if (!ValidParameters.success) {
          return null;
        }
        const { email, password } = ValidParameters.data;
        const foundedUser = await getUserByEmail(email);
        if (!foundedUser || !foundedUser.password) {
          return null;
        }
        const passwordIsEqual = await compare(password, foundedUser.password);
        if (passwordIsEqual) {
          return foundedUser;
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.GithubClientId,
      clientSecret: process.env.GithubClientSecret,
    }),
    Google({
      clientId: process.env.GoogleClientId,
      clientSecret: process.env.GoogleClientSecret,
    }),
  ],
} satisfies NextAuthConfig;
