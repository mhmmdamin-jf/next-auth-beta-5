import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "@/next-auth";

export default function UserInfo({ user }: { user: ExtendedUser | undefined }) {
  return (
    <div className="flex w-[600px] flex-col items-center space-y-3 rounded-md shadow-lg">
      <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
        <p>ID:</p>
        <p>{user?.id}</p>
      </div>
      <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
        <p>Name:</p>
        <p>{user?.name}</p>
      </div>
      <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
        <p>Role:</p>
        <p>{user?.Role}</p>
      </div>
      <div className="flex  w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
        <p>2FA:</p>
        <Badge variant={user?.TwoFactorEnabled ? "emerald" : "destructive"}>
          {user?.TwoFactorEnabled ? "ON" : "OFF"}
        </Badge>
      </div>
    </div>
  );
}
