import { PrismaClient } from "@prisma/client";
import { env } from "process";
declare global {
  var client: PrismaClient | undefined;
}
export const db =
  env.NODE_ENV !== "production"
    ? globalThis.client || new PrismaClient()
    : new PrismaClient();
globalThis.client = db;
