"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Loading from "../Loading";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const fetchCandidate = async () => {
    try {
      const user_id = Cookies.get("user_id");
      const response = await fetch(`/api/candidate/get?user_id=${user_id}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.message.status === "Success") {
        router.push("/dashboard");
      } else {
        // router.push("/create-new-candidate");
        router.push("/dashboard");
      }
    } catch {
      // router.push("/create-new-candidate");
      router.push("/dashboard");
    }
  };

  // useEffect(() => {
  //   fetchCandidate();
  // }, []);

  // console.log(pathname,'pathname');
  

  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const baseUrl = window.location.origin + "/dashboard";
  //   if (currentUrl.startsWith(baseUrl)) return;
  //   const redirectUrl = "/dashboard";
  //   router.push(redirectUrl);
  // }, [router, pathname]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-48px)] p-8 sm:p-20">
      <Loading />
    </div>
  );
}
