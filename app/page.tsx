import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
const font = Poppins({ weight: "600", subsets: ["latin"] });
export default function Home() {
  return (
    <main
      className={cn(
        "flex h-screen flex-row items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800",
        font.className,
      )}
    >
      <div>
        <LoginButton mode="modal" asChild>
          <Button>Sign In</Button>
        </LoginButton>
      </div>
    </main>
  );
}
