"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  className?: string;
  iconSize?: number;
}

export default function DeleteButton({ id, endpoint, className = "", iconSize = 16 }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState<{show: boolean, msg: string}>({ show: false, msg: "" });
  const router = useRouter();

  const performDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const error = await res.json();
        setErrorModal({ show: true, msg: error.error || "Failed to delete item" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      setErrorModal({ show: true, msg: "Something went wrong while deleting" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
        disabled={loading}
        className={`disabled:opacity-50 transition-all ${className}`}
        title="Delete"
      >
        {loading ? <Loader2 size={iconSize} className="animate-spin" /> : <Trash2 size={iconSize} />}
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={performDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item? This action cannot be undone."
        type="confirm"
        confirmText="Delete"
      />

      <Modal
        isOpen={errorModal.show}
        onClose={() => setErrorModal({ show: false, msg: "" })}
        title="Error"
        message={errorModal.msg}
        type="error"
        confirmText="Close"
      />
    </>
  );
}
