"use client";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "./FormMessages";
import { useCurrentRole } from "@/hooks/useCurrentRole";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}
export default function RoleGate({ allowedRole, children }: RoleGateProps) {
  const role = useCurrentRole();
  return (
    <>
      {role === allowedRole ? (
        <>{children}</>
      ) : (
        <FormError message="You do not allowed to see this content." />
      )}
    </>
  );
}
