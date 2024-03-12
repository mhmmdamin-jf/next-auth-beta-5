import AdminComponent from "@/components/admin";
import CardWrapper from "@/components/auth/card-wrapper";

export default function AdminPage() {
  return (
    <CardWrapper
      cardContent={<AdminComponent />}
      social={false}
      cardTitle="Admin🔑"
    />
  );
}
