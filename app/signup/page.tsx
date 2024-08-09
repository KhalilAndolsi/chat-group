import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import SignUpForm from "@/components/pages/signup/SignUpForm";

export default function RegisterPage() {
  return (
    <section className="section-box relative">
      <h1 className="text-center text-4xl font-bold p-4 my-14">Register</h1>
      <SignUpForm />
      <Button variant="ghost" className="absolute top-2 left-2">
        <Link href="/" className="flex items-center justify-center">
          <ChevronLeft size={25} /> <span>Return to home</span>
        </Link>
      </Button>
    </section>
  );
}
