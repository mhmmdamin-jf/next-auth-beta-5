import CardWrapper from "@/components/auth/card-wrapper";
import { LoginForm } from "@/components/auth/loginForm";

export default function Login() {
  return (
    <CardWrapper
      backButton={{ label: "Don't have an account?", link: "/register" }}
      social
      cardContent={<LoginForm />}
      cardTitle="Auth 🔐"
    />
  );
}
