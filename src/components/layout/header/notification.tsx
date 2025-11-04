import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Notification() {
    return (
        <>
            <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
            </Button></>
    )
}