"use client";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Register from "@/actions/register";
import { FormError, FormSuccess } from "../FormMessages";
export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  function onSubmit(values: zod.infer<typeof registerSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      Register(values)
        .then((res) => {
          res.error && setError(res.error);
          res.success && setSuccess(res.success);
        })
        .catch((data) => {
          console.log(data);
          setError("Something went wrong.");
        });
    });
  }
  const [isPending, startTransition] = useTransition();
  const form = useForm<zod.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
        <Button
          className={cn("mt-7 text-center ")}
          variant={"default"}
          size={"lg"}
        >
          Register
        </Button>
      </form>
    </Form>
  );
};
