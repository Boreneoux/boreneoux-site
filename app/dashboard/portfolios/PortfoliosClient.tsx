"use client";

import { useState } from "react";
import { Plus, Pencil, Star } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import type { PortfolioData, PortfolioLink } from "@/types";

const EMPTY: Omit<PortfolioData, "id"> = {
  slug: "",
  title: "",
  shortDescription: "",
  situation: "",
  task: "",
  action: "",
  result: "",
  techStack: [],
  imageUrl: "",
  links: [],
  featured: false,
  order: 0,
};

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

interface Props {
  initialData: PortfolioData[];
}

export function PortfoliosClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioData | null>(null);
  const [form, setForm] = useState<Omit<PortfolioData, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(p: PortfolioData) {
    setEditing(p);
    setForm({ ...p });
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    const payload = editing ? { ...form, id: editing.id } : form;
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/portfolios", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (editing) {
      setData((d) => d.map((p) => (p.id === editing.id ? result : p)));
    } else {
      setData((d) => [...d, result]);
    }
    setSaving(false);
    setModalOpen(false);
  }

  async function remove(id: string) {
    await fetch("/api/portfolios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData((d) => d.filter((p) => p.id !== id));
  }

  function updateLink(i: number, field: keyof PortfolioLink, val: string) {
    setForm((f) => {
      const links = [...f.links];
      links[i] = { ...links[i], [field]: val };
      return { ...f, links };
    });
  }

  function addLink() {
    setForm((f) => ({
      ...f,
      links: [...f.links, { label: "", url: "", type: "live" }],
    }));
  }

  function removeLink(i: number) {
    setForm((f) => ({
      ...f,
      links: f.links.filter((_, idx) => idx !== i),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif italic text-3xl text-fg">Portfolios</h1>
          <p className="text-sm text-fg-muted mt-0.5">{data.length} projects</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-fg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      <div className="rounded-xl border border-border-muted overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg-surface border-b border-border-muted">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-mono uppercase text-fg-subtle">Title</th>
              <th className="text-left px-4 py-3 text-xs font-mono uppercase text-fg-subtle hidden md:table-cell">Slug</th>
              <th className="text-center px-4 py-3 text-xs font-mono uppercase text-fg-subtle">Featured</th>
              <th className="text-right px-4 py-3 text-xs font-mono uppercase text-fg-subtle">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted">
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-bg-surface/50 transition-colors">
                <td className="px-4 py-3 font-medium text-fg">{p.title}</td>
                <td className="px-4 py-3 font-mono text-xs text-fg-subtle hidden md:table-cell">{p.slug}</td>
                <td className="px-4 py-3 text-center">
                  {p.featured && <Star size={14} className="text-accent-alt mx-auto" />}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      className="p-1.5 text-fg-subtle hover:text-accent transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <DeleteDialog onConfirm={() => remove(p.id)} label="portfolio" />
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-fg-subtle text-sm">
                  No portfolios yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-5 py-10 overflow-y-auto">
          <div className="bg-bg border border-border rounded-xl p-6 max-w-2xl w-full shadow-xl space-y-4 my-auto">
            <h2 className="font-serif italic text-2xl text-fg">
              {editing ? "Edit Portfolio" : "Add Portfolio"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      slug: editing ? f.slug : slugify(title),
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm font-mono text-fg focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {([
              { key: "shortDescription", label: "Short Description", hint: "1–2 sentences for listings" },
              { key: "situation", label: "¶1 — Context & Background", hint: "The problem space, who was involved" },
              { key: "task", label: "¶2 — The Challenge", hint: "What needed to be done and why it was hard" },
              { key: "action", label: "¶3 — What You Built", hint: "Your approach, decisions, and execution" },
              { key: "result", label: "¶4 — Impact & Outcome", hint: "Measurable results and what it meant" },
            ] as const).map(({ key, label, hint }) => (
              <div key={key}>
                <label className="block text-xs font-mono text-fg-subtle mb-0.5 uppercase">{label}</label>
                <p className="text-[11px] text-fg-subtle/70 mb-1">{hint}</p>
                <textarea
                  rows={key === "shortDescription" ? 2 : 3}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent resize-none"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                Tech Stack (comma separated)
              </label>
              <input
                value={form.techStack.join(", ")}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    techStack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  }))
                }
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
              />
            </div>

            {/* Links */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-fg-subtle uppercase">Links</label>
                <button onClick={addLink} className="text-xs text-accent hover:underline">+ Add link</button>
              </div>
              {form.links.map((link, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    className="flex-1 px-2 py-1.5 rounded border border-border bg-bg text-xs text-fg focus:outline-none focus:border-accent"
                  />
                  <input
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    className="flex-[2] px-2 py-1.5 rounded border border-border bg-bg text-xs text-fg focus:outline-none focus:border-accent"
                  />
                  <select
                    value={link.type}
                    onChange={(e) => updateLink(i, "type", e.target.value)}
                    className="px-2 py-1.5 rounded border border-border bg-bg text-xs text-fg focus:outline-none focus:border-accent"
                  >
                    <option value="live">live</option>
                    <option value="github">github</option>
                  </select>
                  <button onClick={() => removeLink(i)} className="text-red-400 text-xs px-1">✕</button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-fg-muted">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                    className="accent-[var(--accent)]"
                  />
                  Featured on home
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Image</label>
              <ImageUpload
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              />
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm text-fg-muted border border-border hover:text-fg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm bg-accent text-accent-fg hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
