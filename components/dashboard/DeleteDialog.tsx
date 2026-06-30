"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

interface DeleteDialogProps {
  onConfirm: () => Promise<void>;
  label?: string;
}

export function DeleteDialog({ onConfirm, label = "item" }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handle() {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 text-fg-subtle hover:text-red-500 transition-colors"
        aria-label={`Delete ${label}`}
      >
        <Trash2 size={15} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-5">
          <div className="bg-bg-surface border border-border rounded-xl p-6 max-w-sm w-full shadow-xl space-y-4">
            <h3 className="font-serif italic text-xl text-fg">Are you sure?</h3>
            <p className="text-sm text-fg-muted">
              This will permanently delete this {label}. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-sm text-fg-muted hover:text-fg border border-border transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handle}
                disabled={loading}
                className="px-4 py-2 rounded-lg text-sm text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
