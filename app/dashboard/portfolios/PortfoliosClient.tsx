"use client";

import { useState } from "react";
import { Plus, Pencil, Star, GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteDialog } from "@/components/dashboard/DeleteDialog";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import type { PortfolioData, PortfolioLink, PortfolioLinkType } from "@/types";

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

function SortableRow({
  p,
  onEdit,
  onRemove,
}: {
  p: PortfolioData;
  onEdit: (p: PortfolioData) => void;
  onRemove: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: p.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 px-4 py-3 border-b border-border-muted last:border-0 bg-bg ${isDragging ? "opacity-50 shadow-lg rounded-lg" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-fg-subtle/40 hover:text-fg-subtle transition-colors cursor-grab active:cursor-grabbing touch-none shrink-0"
        aria-label="Drag to reorder"
      >
        <GripVertical size={15} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-fg truncate">{p.title}</p>
        <p className="font-mono text-xs text-fg-subtle truncate">{p.slug}</p>
      </div>
      {p.featured && <Star size={13} className="text-accent-alt shrink-0" />}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(p)}
          className="p-1.5 text-fg-subtle hover:text-accent transition-colors"
        >
          <Pencil size={14} />
        </button>
        <DeleteDialog onConfirm={() => onRemove(p.id)} label="portfolio" />
      </div>
    </div>
  );
}

interface Props {
  initialData: PortfolioData[];
}

export function PortfoliosClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PortfolioData | null>(null);
  const [form, setForm] = useState<Omit<PortfolioData, "id">>(EMPTY);
  const [techStackRaw, setTechStackRaw] = useState("");
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setTechStackRaw("");
    setModalOpen(true);
  }

  function openEdit(p: PortfolioData) {
    setEditing(p);
    setForm({ ...p });
    setTechStackRaw(p.techStack.join(", "));
    setModalOpen(true);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setData((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(items, oldIndex, newIndex).map((item, i) => ({
        ...item,
        order: i + 1,
      }));
      fetch("/api/portfolios", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered.map(({ id, order }) => ({ id, order }))),
      });
      return reordered;
    });
  }

  async function save() {
    setSaving(true);
    const payload = editing
      ? { ...form, id: editing.id, order: editing.order }
      : { ...form, order: data.length + 1 };
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
      links: [...f.links, { label: "", url: "", type: "live" as PortfolioLinkType }],
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
          <p className="text-sm text-fg-muted mt-0.5">{data.length} projects — drag to reorder</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-fg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      <div className="rounded-xl border border-border-muted overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={data.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            {data.map((p) => (
              <SortableRow key={p.id} p={p} onEdit={openEdit} onRemove={remove} />
            ))}
          </SortableContext>
        </DndContext>
        {data.length === 0 && (
          <p className="px-4 py-8 text-center text-fg-subtle text-sm">No portfolios yet.</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm px-5 py-10 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-bg border border-border rounded-xl p-6 max-w-2xl w-full shadow-xl space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
              { key: "situation", label: "¶1 - Context & Background", hint: "The problem space, who was involved" },
              { key: "task", label: "¶2 - The Challenge", hint: "What needed to be done and why it was hard" },
              { key: "action", label: "¶3 - What You Built", hint: "Your approach, decisions, and execution" },
              { key: "result", label: "¶4 - Impact & Outcome", hint: "Measurable results and what it meant" },
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
                value={techStackRaw}
                onChange={(e) => setTechStackRaw(e.target.value)}
                onBlur={() =>
                  setForm((f) => ({
                    ...f,
                    techStack: techStackRaw.split(",").map((s) => s.trim()).filter(Boolean),
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
                    <option value="live">🌐 live demo</option>
                    <option value="github">⌥ github</option>
                    <option value="appstore">🍎 app store</option>
                    <option value="playstore">▶ play store</option>
                    <option value="youtube">▷ youtube</option>
                    <option value="figma">◈ figma</option>
                    <option value="docs">☰ docs</option>
                  </select>
                  <button onClick={() => removeLink(i)} className="text-red-400 text-xs px-1">✕</button>
                </div>
              ))}
            </div>

            <div className="flex items-center pt-1">
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
