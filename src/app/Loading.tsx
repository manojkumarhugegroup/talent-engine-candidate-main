"use client";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
const Loading = ({ text }: { text?: string }) => (
  <div
    id="loading"
    data-testid="loading"
    className="flex flex-col items-center justify-center"
  >
    <Spinner className="text-(--primary)" size={48} />
    <p>{text}</p>
  </div>
);
export default Loading;
