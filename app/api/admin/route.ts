import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const role = await currentRole();
  if (role === UserRole.Admin) {
    return NextResponse.json("Allowed api route for admin.", { status: 200 });
  } else {
    return NextResponse.json("this route is not allowed for current user.", {
      status: 403,
    });
  }
};
