"use client";
import { verifyEmail } from "@/actions/verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import Loader from "react-spinkit";
import { FormError, FormSuccess } from "../FormMessages";
export default function VerificationContent() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [pending, transition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>();
  const verifyToken = useCallback(() => {
    const token = searchParams.get("token");
    if (!token) {
      setError("token not found.");
      return;
    }
    transition(() => {
      verifyEmail(token).then((res) => {
        console.log(res);
        setError(res?.error);
        setSuccess(res?.success);
      });
    });
  }, [searchParams]);
  useEffect(
    function () {
      verifyToken();
    },
    [verifyToken],
  );
  return (
    <div>
      {!success && !error && <Loader name="folding-cube" />}
      {success && <FormSuccess message={success} />}
      {!success && error && <FormError message={error} />}
    </div>
  );
}
