"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/images/google.png";
import SignInWithGoogle from "@/components/system/SignInWithGoogle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { Loader } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false)
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsPending(true)
    try {
      if (!info.email) {
        return toast.info("Username is required!");
      }
      if (!info.password) {
        return toast.info("Password is required!");
      }
      const result = await signIn("credentials", {
        redirect: false,
        email: info.email,
        password: info.password,
      });
  
      if (result?.error) {
        toast.warning("Please enter your corrent information!")
      } else if (result?.ok) {
        toast.success("Welcome to Chat-Group ♥");
        router.replace("/chat");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!")
    } finally {
      setIsPending(false)
    }
  }
  return (
    <form className="w-full max-w-[550px] mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="text-sm p-1">
          Email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm p-1">
          Password
        </label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="********"
          onChange={handleChange}
        />
        <Link
          href="/forgot-password"
          className="text-xs underline text-neutral-600 dark:text-neutral-300 px-2">
          Forgot password ?
        </Link>
      </div>
      <div className="flex items-center justify-between gap-7">
        <Button variant="default" className="grow" type="submit">
          {isPending ? <Loader size={16} className="animate-spin"/> : "Sign In"}
        </Button>
        <p className="text-sm">
          I don't have account,{" "}
          <Link href="/signup" className="font-medium">
            Register
          </Link>
        </p>
      </div>
      <p className="bar-or" />
      <div className="text-center">
        <SignInWithGoogle className="w-1/2 space-x-3">
          <Image
            src={GoogleIcon}
            width={50}
            height={50}
            alt="google icon"
            className="size-5"
          />
          <span>Sign In With Google</span>
        </SignInWithGoogle>
      </div>
    </form>
  );
}
