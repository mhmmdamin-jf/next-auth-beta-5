"use client";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import login from "@/actions/login";
import { FormError, FormSuccess } from "../FormMessages";
import { useSearchParams } from "next/navigation";
import BackButton from "./BackButton";
export const LoginForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [urlError, setUrlError] = useState<string | undefined>("");
  const [twoFactor, setTwoFactor] = useState<boolean | undefined>(false);
  const errorUrl = searchParams.get("error");
  const callBackUrl = searchParams.get("callBackUrl");
  const checkingUrlError = useCallback(() => {
    if (errorUrl?.startsWith("OAuthAccountNotLinked")) {
      setUrlError(
        "this account is created by another provider. please try by else.",
      );
      console.log(urlError);
    }
  }, [errorUrl, urlError]);
  useEffect(
    function () {
      checkingUrlError();
    },
    [checkingUrlError],
  );
  async function onSubmit(values: zod.infer<typeof loginSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      if (twoFactor) {
        login({ values, callBackUrl })
          .then((res) => {
            res.success && setSuccess(res.success);
            res.error && setError(res.error);
            res.twoFactor && setTwoFactor(true);
          })
          .catch((data) => {
            console.log(data);
            setError("Something went wrong.");
          });
      } else {
        login({ values: { ...values, twoFactor: "not entered" }, callBackUrl })
          .then((res) => {
            res.success && setSuccess(res.success);
            res.error && setError(res.error);
            res.twoFactor && setTwoFactor(true);
          })
          .catch((data) => {
            console.log(data);
            setError("Something went wrong.");
          });
      }
    });
  }
  const [isPending, startTransition] = useTransition();
  const form = useForm<zod.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", code: "" },
  });
  return (
    <Form {...form}>
      <form
        className="flex flex-col items-center space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className={twoFactor ? "hidden" : ""}>
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
            <FormItem className={twoFactor ? "hidden" : ""}>
              <FormLabel>Password:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className={!twoFactor ? "hidden" : ""}>
              <FormLabel>2FA Code:</FormLabel>
              <FormControl>
                <Input {...field} type="text" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        {(urlError || error) && <FormError message={urlError || error} />}
        {success && <FormSuccess message={success} />}
        {!twoFactor && <BackButton link="/reset">forget password?</BackButton>}
        <Button
          asChild
          className={cn("mt-7 text-center ")}
          variant={"default"}
          size={"lg"}
        >
          <button type="submit">
            {!twoFactor ? "Login " : "Confirm code"}
          </button>
        </Button>
      </form>
    </Form>
  );
};
