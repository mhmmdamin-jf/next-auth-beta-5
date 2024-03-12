"use client";
import { CardContent } from "../../components/ui/card";
import CardWrapper from "../../components/auth/card-wrapper";
import { BiSolidErrorCircle } from "react-icons/bi";

export default function ErrorPage(error: string) {
  const errorContent = (
    <CardContent className="flex flex-col items-center">
      <p>{error}</p>
      <BiSolidErrorCircle />
    </CardContent>
  );
  return (
    <CardWrapper
      backButton={{ link: "/login", label: "go to login and try again." }}
      cardContent={errorContent}
      social={false}
    ></CardWrapper>
  );
}
