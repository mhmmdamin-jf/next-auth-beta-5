import { logout } from "@/actions/logout";

interface logoutButtonProps {
  children: React.ReactNode;
}

export default function logoutButton({ children }: logoutButtonProps) {
  return (
    <span
      className="h-full w-full cursor-pointer"
      onClick={async () => {
        await logout();
      }}
    >
      {children}
    </span>
  );
}
