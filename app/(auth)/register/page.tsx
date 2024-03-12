import CardWrapper from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/registerForm";

export default function Register() {
  return (
    <CardWrapper
      backButton={{ label: "Already have an account?", link: "/login" }}
      cardTitle="Auth 🔐"
      social
      cardContent={<RegisterForm />}
    />
  );
}
