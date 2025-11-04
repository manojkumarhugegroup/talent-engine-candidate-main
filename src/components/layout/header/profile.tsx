import React, { useState, useEffect } from "react";
import { LayoutDashboard, LockIcon, LogOutIcon, UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function Profile() {
  const router = useRouter();
  const logOut = () => {
    Cookies.remove("sid");
    Cookies.remove("user_id");
    Cookies.remove("full_name");
    router.push("/login");
  };

  const [editRoute, seteditRoute] = useState("/profile/edit-profile");

  const [dashboardRoute, setdashboardRoute] = useState("/dashboard");

  // const fetchCandidate = async () => {
  //   try {
  //     const user_id = Cookies.get("user_id");
  //     const response = await fetch(`/api/candidate/get?user_id=${user_id}`, {
  //       cache: "no-store",
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (data.message.status === "Success") {
  //       seteditRoute("/profile/edit-profile");
  //       setdashboardRoute("/dashboard");
  //     } else {
  //       seteditRoute("/create-new-candidate");
  //       setdashboardRoute("/dashboard");
  //     }
  //   } catch {
  //     seteditRoute("/create-new-candidate");
  //     setdashboardRoute("/dashboard");
  //   }
  // };

  // useEffect(() => {
  //   fetchCandidate();
  // }, []);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full flex items-center gap-2 px-2 py-1.5"
            >
              <Avatar className="h-8 w-8  cursor-pointer">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </Button>
            <span className="text-sm font-medium">User</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(dashboardRoute);
            }}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(editRoute);
            }}
          >
            <UserIcon className="mr-2 h-4 w-4" />
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LockIcon className="mr-2 h-4 w-4" />
            Change Password
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive" onClick={logOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
