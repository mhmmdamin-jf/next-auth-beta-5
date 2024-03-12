import { UserRole } from "@prisma/client";
import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().min(1, "email is required."),
  password: zod.string().min(1, "password is required."),
  code: zod.string().optional(),
});

export const registerSchema = zod.object({
  name: zod.string().min(1, "name is requied."),
  email: zod.string().email().min(1, "email is required."),
  password: zod.string().min(1, "password is required."),
});

export const resetSchema = zod.object({
  email: zod.string().min(1, "email is required."),
});

export const newPasswordSchema = zod.object({
  password: zod.string().min(6, "password is required."),
});
export const twoFactorSchema = zod.object({
  code: zod.string().min(1, "2FA code is required."),
});
export const settingsSchema = zod
  .object({
    name: zod.string().optional(),
    email: zod.string().optional(),
    password: zod.string().optional(),
    newPassword: zod.string().optional(),
    Role: zod.enum([UserRole.Admin, UserRole.User]),
    TwoFactorEnabled: zod.boolean(),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "new password is required.", path: ["newPassword"] },
  )
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "password is required.", path: ["password"] },
  );
