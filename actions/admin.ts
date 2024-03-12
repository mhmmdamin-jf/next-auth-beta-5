import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();
  if (role === UserRole.Admin) {
    return Response.json("this is allowed for admin.", { status: 200 });
  }
  return Response.json("this is not allowed for current user.", {
    status: 403,
  });
};
