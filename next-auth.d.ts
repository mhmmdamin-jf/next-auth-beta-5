import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  Role: UserRole;
  id: string;
  TwoFactorEnabled: boolean;
  oauth: boolean;
  password: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
