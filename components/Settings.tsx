"use client";

import { settingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import { settings } from "@/actions/settings";
import { FormError, FormSuccess } from "./FormMessages";
import { UserRole } from "@prisma/client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Switch } from "./ui/switch";
import { useSession } from "next-auth/react";

export const SettingsContent = () => {
  const [success, setSuccess] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const currentUser = useCurrentUser();
  const { update } = useSession();
  const form = useForm<zod.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: currentUser?.email || "",
      name: currentUser?.name || "",
      newPassword: "",
      password: "",
      Role: currentUser?.Role || UserRole.User,
      TwoFactorEnabled: currentUser?.TwoFactorEnabled || false,
    },
  });

  const submit = (values: zod.infer<typeof settingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((res) => {
          res?.error && setError(res.error);
          if (res?.success) {
            res?.success && setSuccess(res.success);
            update();
          }
        })
        .catch((data) => {
          console.log(data);
          setError(data);
        });
      // .finally(() => update());
    });
  };
  return (
    <div className="flex min-w-[600px] flex-col items-center ">
      <Form {...form}>
        <form
          className="flex w-full flex-col items-center space-y-3 divide-y-[1px] divide-sky-400"
          onSubmit={form.handleSubmit(submit)}
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full items-baseline justify-center space-x-5">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="john doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full items-baseline justify-center space-x-5">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="xxxxx@xxxx.xxx"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full items-baseline justify-center space-x-5">
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full items-baseline justify-center space-x-5">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input disabled={isPending} placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="Role"
            control={form.control}
            render={({ field }) => (
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>{field.value}</SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRole.User}>User</SelectItem>
                  <SelectItem value={UserRole.Admin}>Admin</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FormField
            name="TwoFactorEnabled"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>2FA</FormLabel>
                <FormDescription>
                  Enable two factor authentication for your account
                </FormDescription>
                <FormControl>
                  <Switch
                    disabled={isPending}
                    onCheckedChange={field.onChange}
                    checked={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button asChild variant={"default"}>
            <button type="submit">Update</button>
          </Button>
        </form>
      </Form>
    </div>
  );
};
