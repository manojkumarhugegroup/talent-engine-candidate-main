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
      router.push("/");
    } else {
      router.push("/");
    }
  }, [router]);

  return <>{children}</>;
}
