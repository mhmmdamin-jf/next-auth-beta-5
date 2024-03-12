import React from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}
export default function NavBar({ children, className }: NavbarProps) {
  return (
    <nav
      className={`flex h-[60px] w-[700px] items-center  rounded-lg bg-stone-300 px-4  shadow-md ${className}`}
    >
      {children}
    </nav>
  );
}
