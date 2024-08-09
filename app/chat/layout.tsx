import Aside from "@/components/pages/chat/Aside";
import SlideBar from "@/components/pages/chat/SlideBar";
import { authOptions } from "@/lib/authOptions ";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Home",
    template: "%s - CG",
  },
};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <section className="section-box flex gap-4 p-4">
      <Aside session={session} className="w-fit rounded lg:flex flex-col gap-4 hidden" />
      <section className="grow border border-foreground p-2 rounded bg-neutral-100 dark:bg-neutral-800">
        <SlideBar session={session} className="w-fit rounded flex flex-col gap-4" />
        {children}
      </section>
    </section>
  );
}
