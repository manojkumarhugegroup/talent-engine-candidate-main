"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function VerifyUser({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const fullName = Cookies.get("full_name");
    if (
      !fullName ||
      fullName === "Guest" ||
      fullName === "undefined" ||
      fullName === "null"
    ) {
      // router.push("/login");
      const currentUrl = window.location.href;
      const baseUrl = window.location.origin + "/dashboard";
      if (currentUrl.startsWith(baseUrl)) return;
      router.push("/dashboard");
    } else {
      const currentUrl = window.location.href;
      const baseUrl = window.location.origin + "/dashboard";
      if (currentUrl.startsWith(baseUrl)) return;
      router.push("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}
