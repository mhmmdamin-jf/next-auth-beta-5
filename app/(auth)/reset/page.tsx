import CardWrapper from "@/components/auth/card-wrapper";
import ResetForm from "@/components/auth/resetForm";

export default function Reset() {
  return (
    <CardWrapper
      social={false}
      cardTitle="reset password"
      backButton={{ label: "back to login", link: "/login" }}
      cardContent={<ResetForm />}
    />
  );
}
