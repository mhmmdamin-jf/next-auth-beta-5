"use client";
import { admin } from "@/actions/admin";
import RoleGate from "./role-gate";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function AdminComponent() {
  const serverReq = () => {
    try {
      admin();
      toast.success("server req success.");
    } catch (err) {
      toast.error("server req failed.");
    }
  };
  const apiReq = () => {
    fetch("api/admin")
      .then((res) => {
        if (res.ok) {
          toast.success("api req success.");
        } else {
          toast.error("api req failed.");
        }
      })
      .catch(() => toast.error("api req failed."));
  };
  return (
    <div className="flex w-[600px] flex-col items-center space-y-3 rounded-md shadow-lg">
      <RoleGate allowedRole="Admin">
        <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
          <p>Admin api request</p>
          <Button variant={"default"} asChild>
            <button onClick={apiReq}>click to test</button>
          </Button>
        </div>
        <div className="flex w-full justify-between rounded-md border border-stone-300 px-12 py-2 shadow-sm">
          <p>Admin server side request</p>
          <Button variant={"default"} asChild>
            <button onClick={serverReq}>click to test</button>
          </Button>
        </div>
      </RoleGate>
    </div>
  );
}
