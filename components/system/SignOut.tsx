"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOut({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button variant="outline" className={className} onClick={() => signOut({callbackUrl: "/signin"})}>
      {children}
    </Button>
  );
}
