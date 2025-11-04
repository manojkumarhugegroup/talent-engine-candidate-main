import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, XCircle, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function CopyButton({
  content,
  icon,
}: {
  content: string;
  icon?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;

    if (!navigator.clipboard) {
      toast.error("Copying isn't supported in this browser.");
      return;
    }

    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        toast.success("Copied to clipboard!", {
          style: {
            backgroundColor: "#dcfce7",
            color: "#166534",
          },
        });
        setTimeout(() => setCopied(false), 5000);
      })
      .catch((e) => {
        console.error("Failed to copy text: ", e);
        toast.error("Failed to copy text!", {
          style: {
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
          },
        });
      });
  };

  return (
    <Button
      variant="ghost"
      onClick={handleCopy}
      className="w-fit flex justify-center !p-0 h-fit"
      aria-label="Copy email"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, scale: 0.8, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1 text-green-500"
          >
            <CheckIcon className="h-5" />
            <p className="text-xs select-none">Copied</p>
          </motion.div>
        ) : (
          <motion.img
            key="copyIcon"
            src={icon}
            alt="copy icon"
            className="w-5 h-5"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
