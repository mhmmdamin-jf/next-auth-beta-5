"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "../ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { LoginForm } from "./loginForm";
import CardWrapper from "./card-wrapper";
import { Button } from "../ui/button";

interface LoginButtonProps {
  children: React.ReactNode | string;
  modal: boolean;
  asChild: boolean;
}
export default function LoginButton({
  children,
  modal,
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  return modal ? (
    <Dialog>
      <DialogTrigger className="absolute my-10" asChild={asChild}>
        {children}
      </DialogTrigger>
      <DialogContent className=" relative w-auto bg-transparent">
        <CardWrapper
          backButton={{ label: "Don't have an account?", link: "/register" }}
          social
          cardContent={<LoginForm />}
          cardTitle="Auth 🔐"
        />
      </DialogContent>
    </Dialog>
  ) : (
    <span onClick={() => router.push("/login")}>{children}</span>
  );
}
