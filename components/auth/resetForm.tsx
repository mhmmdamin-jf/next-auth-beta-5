"use client";
import { resetSchema } from "@/schemas";
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
import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { FormError } from "../FormMessages";
import { reset } from "@/actions/reset";

export default function ResetForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const onClick = (values: zod.infer<typeof resetSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((res) => {
        res?.error && setError(res.error);
        res?.success && setSuccess(res.success);
      });
    });
  };
  const form = useForm<zod.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onClick)}
        className="flex flex-col items-center space-y-6"
      >
        <FormField
          name="email"
          control={form.control}
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={error} />}
        {success && <FormError message={success} />}
        <Button
          asChild
          className={cn("mt-7 text-center ")}
          variant={"default"}
          size={"lg"}
        >
          <button type="submit">send reset link</button>
        </Button>
      </form>
    </Form>
  );
}
