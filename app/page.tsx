import SignOut from "@/components/system/SignOut";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/authOptions ";
import { LogOut, MessageCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  return (
    <section className="section-box flex flex-col">
      <header className="flex items-center justify-between">
        <h1 className="text-lg lg:text-3xl font-bold p-4">ChatGroup</h1>
        <nav className="space-x-2">
          {session !== null ? (
            <div className="flex gap-2">
              <Button variant="default">
                <Link href="/chat" className="flex items-center gap-2">
                  Open Chat <MessageCircle size={16} />
                </Link>
              </Button>
              <SignOut className="flex items-center gap-2">
                Sign Out <LogOut size={16} />
              </SignOut>
            </div>
          ) : (
            <>
              <Button variant="outline" className="hidden lg:inline">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button variant="default">
                <Link href="/signin">Sign In</Link>
              </Button>
            </>
          )}
        </nav>
      </header>
      <div className="grow flex items-center justify-center flex-col">
        <h3 className="text-center text-3xl lg:text-6xl font-extrabold leading-none">
          ChatGroup For <br />
          <span className="text-gradient text-4xl lg:text-8xl">
            Communication
          </span>
        </h3>
        <p className="text-center text-neutral-600 text-sm lg:text-base">
          Connect with groups and colleagues instantly!
        </p>
        <div className="flex items-center justify-center mt-4">
          <Button variant="outline"><Link href="/chat">Start Now ✨</Link></Button>
        </div>
      </div>
    </section>
  );
}
