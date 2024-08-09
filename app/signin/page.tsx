import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import GoogleIcon from "@/assets/images/google.png";
import SignInWithGoogle from "@/components/system/SignInWithGoogle";
import { ChevronLeft } from "lucide-react";
import SignInForm from "@/components/pages/signin/SignInForm";

export default function LoginPage() {
  return (
    <section className="section-box relative">
      <h1 className="text-center text-4xl font-bold p-4 my-14">Login</h1>
      <SignInForm />
      <Button variant="outline" className="absolute top-2 left-2">
        <Link href="/" className="flex items-center justify-center">
          <ChevronLeft size={25} /> <span>Return to home</span>
        </Link>
      </Button>
    </section>
  );
}
