"use client";

import { useState, useRef } from "react";
import { Upload, FileText, ExternalLink, Check } from "lucide-react";

interface Props {
  resumeUrl: string;
}

export function SettingsClient({ resumeUrl: initialUrl }: Props) {
  const [resumeUrl, setResumeUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
    const { url } = await uploadRes.json();

    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeUrl: url }),
    });

    setResumeUrl(url);
    setUploading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="font-serif italic text-3xl text-fg">Settings</h1>
        <p className="text-sm text-fg-muted mt-0.5">Site-wide configuration</p>
      </div>

      <div className="rounded-xl border border-border-muted overflow-hidden">
        <div className="bg-bg-surface px-5 py-3 border-b border-border-muted">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-alt">Resume</span>
        </div>

        <div className="p-5 space-y-4">
          {resumeUrl ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-surface border border-border-muted">
              <FileText size={18} className="text-accent shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-fg-subtle font-mono truncate">{resumeUrl}</p>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-fg-subtle hover:text-accent transition-colors shrink-0"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          ) : (
            <p className="text-sm text-fg-subtle italic">No resume uploaded yet.</p>
          )}

          <div>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-fg-muted hover:text-fg hover:border-accent transition-colors disabled:opacity-50"
            >
              <Upload size={14} />
              {uploading ? "Uploading..." : resumeUrl ? "Replace PDF" : "Upload PDF"}
            </button>
          </div>

          {saved && (
            <p className="flex items-center gap-1.5 text-sm text-green-500">
              <Check size={14} /> Resume updated - live immediately
            </p>
          )}

          <p className="text-xs text-fg-subtle">
            Upload a new PDF anytime. The download link on your site updates instantly - no redeploy needed.
          </p>
        </div>
      </div>
    </div>
  );
}
