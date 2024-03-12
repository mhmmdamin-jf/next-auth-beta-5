import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/auth";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html>
        <body>
          <Toaster position="top-center" />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
