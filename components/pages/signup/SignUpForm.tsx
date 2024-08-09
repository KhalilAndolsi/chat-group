"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import GoogleIcon from "@/assets/images/google.png";
import SignInWithGoogle from "@/components/system/SignInWithGoogle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false)
  const [info, setInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsPending(true)
      if (!info.email) {
        return toast.info("Email is required!");
      }
      if (!info.name) {
        return toast.info("Username is required!");
      }
      if (!info.password) {
        return toast.info("Password is required!");
      }
      console.log(info);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.warning(data.error || "Something went wrong!");
        return;
      }
      toast.success(data.message);
      const result = await signIn("credentials", {
        redirect: false,
        email: info.email,
        password: info.password,
      });
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.ok) {
        toast.success("Welcome to Chat-Group ♥");
        router.replace("/chat");
        router.refresh();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsPending(false)
    }
  };
  return (
    <form
      className="w-full max-w-[550px] mx-auto flex flex-col gap-4"
      onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" className="text-sm p-1">
          Username
        </label>
        <Input
          type="text"
          name="name"
          id="username"
          placeholder="John Doe"
          onChange={handleChange}
        />
      </div>
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
      </div>
      <div className="flex items-center justify-between gap-7">
        <p className="text-sm">
          Already i have account,{" "}
          <Link href="/signin" className="font-medium">
            {isPending ? <Loader size={16} className="animate-spin"/> : "Login"}
          </Link>
        </p>
        <Button variant="default" className="grow" type="submit">
          Sign Up
        </Button>
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
          <span>Sign Up With Google</span>
        </SignInWithGoogle>
      </div>
    </form>
  );
}
