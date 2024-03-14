"use client";
import BackButton from "./BackButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import login from "@/actions/login";
import { useSearchParams } from "next/navigation";
export default function Social() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callbackUrl");
  const onClick = async (provider: "google" | "github") => {
    await login({ provider, values: "", callBackUrl });
  };
  return (
    <div className="flex w-full justify-between space-x-10">
      <BackButton onClick={() => onClick("google")}>
        <FcGoogle />
      </BackButton>
      <BackButton onClick={() => onClick("github")}>
        <FaGithub />
      </BackButton>
    </div>
  );
}
