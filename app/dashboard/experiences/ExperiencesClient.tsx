"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import type { ExperienceData } from "@/types";

const EMPTY: Omit<ExperienceData, "id"> = {
  company: "",
  position: "",
  dateIn: "",
  dateOut: "",
  description: [],
  techStack: [],
  imageUrl: "",
  order: 0,
};

interface Props {
  initialData: ExperienceData[];
}

export function ExperiencesClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ExperienceData | null>(null);
  const [form, setForm] = useState<Omit<ExperienceData, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(exp: ExperienceData) {
    setEditing(exp);
    setForm({ ...exp });
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    const payload = editing ? { ...form, id: editing.id } : form;
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/experiences", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (editing) {
      setData((d) => d.map((e) => (e.id === editing.id ? result : e)));
    } else {
      setData((d) => [...d, result]);
    }
    setSaving(false);
    setModalOpen(false);
  }

  async function remove(id: string) {
    await fetch("/api/experiences", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData((d) => d.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif italic text-3xl text-fg">Experiences</h1>
          <p className="text-sm text-fg-muted mt-0.5">{data.length} entries</p>
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
              <th className="text-left px-4 py-3 text-xs font-mono uppercase text-fg-subtle">Company</th>
              <th className="text-left px-4 py-3 text-xs font-mono uppercase text-fg-subtle hidden md:table-cell">Position</th>
              <th className="text-left px-4 py-3 text-xs font-mono uppercase text-fg-subtle hidden md:table-cell">Period</th>
              <th className="text-right px-4 py-3 text-xs font-mono uppercase text-fg-subtle">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-muted">
            {data.map((exp) => (
              <tr key={exp.id} className="hover:bg-bg-surface/50 transition-colors">
                <td className="px-4 py-3 font-medium text-fg">{exp.company}</td>
                <td className="px-4 py-3 text-fg-muted hidden md:table-cell">{exp.position}</td>
                <td className="px-4 py-3 text-fg-subtle font-mono text-xs hidden md:table-cell">
                  {exp.dateIn} – {exp.dateOut}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => openEdit(exp)}
                      className="p-1.5 text-fg-subtle hover:text-accent transition-colors"
                    >
                      <Pencil size={15} />
                    </button>
                    <DeleteDialog onConfirm={() => remove(exp.id)} label="experience" />
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-fg-subtle text-sm">
                  No experiences yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-5 py-10 overflow-y-auto">
          <div className="bg-bg border border-border rounded-xl p-6 max-w-lg w-full shadow-xl space-y-4 my-auto">
            <h2 className="font-serif italic text-2xl text-fg">
              {editing ? "Edit Experience" : "Add Experience"}
            </h2>

            <div className="space-y-3">
              {(["company", "position", "dateIn", "dateOut"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                    {field}
                  </label>
                  <input
                    value={form[field]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                  Description (one per line)
                </label>
                <textarea
                  rows={4}
                  value={form.description.join("\n")}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      description: e.target.value.split("\n").filter(Boolean),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent resize-none"
                />
              </div>

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

              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                  Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                  Image
                </label>
                <ImageUpload
                  value={form.imageUrl}
                  onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                />
              </div>
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
