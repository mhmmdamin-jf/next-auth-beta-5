"use client";
import UserInfo from "@/components/UserInfo";
import CardWrapper from "@/components/auth/card-wrapper";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function ClientPage() {
  const user = useCurrentUser();
  return (
    <CardWrapper
      cardTitle="Client 💻"
      social={false}
      cardContent={<UserInfo user={user} />}
    />
  );
}
