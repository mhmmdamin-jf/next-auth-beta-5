"use client";
import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton({
  children,
  link,
  onClick,
}: {
  link?: string;
  onClick?: () => void;
  children: string | React.ReactNode;
}) {
  if (link) {
    return (
      <Button variant={"link"} size={"default"}>
        <Link href={link}>{children}</Link>
      </Button>
    );
  }
  if (onClick) {
    return (
      <Button
        onClick={onClick}
        variant={"outline"}
        size={"lg"}
        className="px-12"
      >
        {children}
      </Button>
    );
  }
  return null;
}
