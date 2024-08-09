"use client";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignInWithGoogle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={className}
      onClick={() => signIn("google", { callbackUrl: "/chat" })}>
      {children}
    </Button>
  );
}
