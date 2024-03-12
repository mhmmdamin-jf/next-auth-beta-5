import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { CardFooter } from "./ui/card";
export function FormSuccess({ message }: { message?: string }) {
  if (message)
    return (
      <CardFooter
        className="flex w-full  justify-center gap-x-2 rounded-md border border-emerald-500/20
       bg-emerald-400/30 py-2"
      >
        <CheckCircledIcon />
        {message}
      </CardFooter>
    );
}
export function FormError({ message }: { message?: string }) {
  if (message)
    return (
      <CardFooter
        className="flex w-full  justify-center gap-x-2 rounded-md border border-destructive/20
      bg-destructive/30 py-2"
      >
        <ExclamationTriangleIcon />
        {message}
      </CardFooter>
    );
}
