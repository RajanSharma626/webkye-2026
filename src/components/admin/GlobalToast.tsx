"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Toast from "@/components/ui/toast";

export default function GlobalToast() {
  const pathname = usePathname();
  const [toast, setToast] = useState<{ show: boolean; message: string; type: "success" | "error" }>({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    // Check session storage for pending toast messages on page load or route change
    const pendingToastMessage = sessionStorage.getItem("pendingToastMessage");
    const pendingToastType = sessionStorage.getItem("pendingToastType") as "success" | "error";

    if (pendingToastMessage) {
      setToast({
        show: true,
        message: pendingToastMessage,
        type: pendingToastType || "success",
      });
      // Clear the storage so it doesn't show again on refresh
      sessionStorage.removeItem("pendingToastMessage");
      sessionStorage.removeItem("pendingToastType");
    }
  }, [pathname]);

  return (
    <Toast 
      show={toast.show} 
      message={toast.message} 
      type={toast.type} 
      onClose={() => setToast({ ...toast, show: false })} 
    />
  );
}
