import CardWrapper from "@/components/auth/card-wrapper";
import NewPasswordForm from "@/components/auth/newPasswordForm";
export default function newPassword() {
  return (
    <CardWrapper
      social={false}
      cardTitle="Set new password"
      backButton={{ link: "/login", label: "back to login" }}
      cardContent={<NewPasswordForm />}
    />
  );
}
