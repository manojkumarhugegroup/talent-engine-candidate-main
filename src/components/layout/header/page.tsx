"use client";
import { BreadcrumbCSeparator } from "./breadcrumb";
import { Profile } from "./profile";
import { Notification } from "./notification";

export function Header() {
  return (
    <>
      <div className="flex justify-between items-center border-b py-2 px-4 sticky top-0 bg-(--background) z-50 max-h-14">
        <span className="flex items-center gap-1">
          <BreadcrumbCSeparator />
        </span>
        <header className="flex  items-center justify-end gap-2">
          <Notification />
          <Profile />
        </header>
      </div>
    </>
  );
}
