"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessToast({
    updated,
    deleted,
}: {
    updated?: string;
    deleted?: string;
}) {
    useEffect(() => {
        if (updated) {
            toast.success("Property updated successfully!");
        }
        if (deleted) {
            toast.success("Property deleted successfully!");
        }

    }, [updated, deleted]);

    return null;
}