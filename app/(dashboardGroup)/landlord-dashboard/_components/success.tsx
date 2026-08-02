"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessToast({ updated }: { updated?: string }) {
  useEffect(() => {
    if (updated) {
      toast.success("Property updated successfully");
    }
  }, [updated]);

  return null;
}