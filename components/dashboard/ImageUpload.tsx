"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError("Upload failed");
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL or upload below"
        className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent"
      />
      <div
        className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border-muted rounded-lg p-6 cursor-pointer hover:border-border transition-colors"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        {uploading ? (
          <p className="text-sm text-fg-muted">Uploading...</p>
        ) : (
          <>
            <Upload size={18} className="text-fg-subtle" />
            <p className="text-xs text-fg-subtle">Drop image here or click to browse</p>
          </>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {value && !uploading && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-bg-surface">
          <Image src={value} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
