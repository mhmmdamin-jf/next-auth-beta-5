import CardWrapper from "@/components/auth/card-wrapper";
import VerificationContent from "@/components/auth/verification";
import { CardContent } from "@/components/ui/card";

export default function newVerification() {
  const Content = (
    <CardContent>
      <VerificationContent />
    </CardContent>
  );
  return (
    <CardWrapper
      cardTitle="Confirming Email."
      backButton={{ label: "login page", link: "/login" }}
      cardContent={Content}
      social={false}
    />
  );
}
