import { DefaultSession } from "next-auth";
export type ExtendedUser = DefaultSession["user"] & {
  Role: User | Admin;
  id: String;
  TwoFactorEnabled: boolean;
  oauth: boolean;
  password: string;
};

declare module "next-auth" {
  interface session {
    user: ExtendedUser;
  }
}
