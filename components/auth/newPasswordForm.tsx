"use client";
import { newPasswordSchema, resetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { FormError, FormSuccess } from "../FormMessages";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/newPassword";
import { cn } from "@/lib/utils";
export default function NewPasswordForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const form = useForm<zod.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "" },
  });
  const onSubmit = (values: zod.infer<typeof newPasswordSchema>) => {
    setError("");
    setSuccess("");
    const token = searchParams.get("token");
    if (!token) {
      setError("token not found.");
    } else {
      startTransition(() => {
        newPassword(values, token).then((res) => {
          res?.error && setError(res?.error);
          res?.success && setSuccess(res?.success);
          console.log(res);
        });
      });
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password:</FormLabel>
              <FormControl {...field}>
                <Input disabled={isPending} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
        <Button
          asChild
          className={cn("mt-7 text-center ")}
          variant={"default"}
          size={"lg"}
        >
          <button type="submit">Submit</button>
        </Button>
      </form>
    </Form>
  );
}
