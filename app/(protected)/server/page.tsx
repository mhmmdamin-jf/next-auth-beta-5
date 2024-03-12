import UserInfo from "@/components/UserInfo";
import CardWrapper from "@/components/auth/card-wrapper";
import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
  const user = await currentUser();
  return (
    <CardWrapper
      cardContent={<UserInfo user={user} />}
      cardTitle="Server 🗄️"
      social={false}
    />
  );
}
