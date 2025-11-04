"use client";

import { Suspense, useState } from "react";
import { Header } from "@/components/layout/header/page";
import { DataProvider } from "@/context/DataProvider";
import { Toaster } from "sonner";
import Loading from "../Loading";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DataProvider>
      <div className="flex h-screen bg-background w-full">
        <div className="flex flex-col flex-1 min-w-0">
          {/* Fixed header */}
          <div className="flex-shrink-0">
            <Header />
          </div>
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            <main className=" h-[calc(90vh-24px)]" id="main-content">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </DataProvider>
  );
}
