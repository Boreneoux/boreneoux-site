"use client";

import { useState } from "react";
import { Plus, Pencil, GripVertical } from "lucide-react";
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
import type { ExperienceData } from "@/types";

const EMPTY: Omit<ExperienceData, "id" | "order"> = {
  company: "",
  position: "",
  dateIn: "",
  dateOut: "",
  description: [],
  techStack: [],
  imageUrl: "",
  type: "work",
};

function SortableRow({
  exp,
  onEdit,
  onRemove,
}: {
  exp: ExperienceData;
  onEdit: (e: ExperienceData) => void;
  onRemove: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: exp.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 px-4 py-3 border-b border-border-muted last:border-0 bg-bg ${isDragging ? "opacity-50 shadow-lg rounded-lg" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-fg-subtle/40 hover:text-fg-subtle transition-colors cursor-grab active:cursor-grabbing touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical size={15} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-fg truncate">{exp.company}</p>
        <p className="text-xs text-fg-muted truncate">{exp.position}</p>
      </div>
      <span className="font-mono text-xs text-fg-subtle hidden md:block shrink-0">
        {exp.dateIn} – {exp.dateOut}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(exp)}
          className="p-1.5 text-fg-subtle hover:text-accent transition-colors"
        >
          <Pencil size={14} />
        </button>
        <DeleteDialog onConfirm={() => onRemove(exp.id)} label="experience" />
      </div>
    </div>
  );
}

interface Props {
  initialData: ExperienceData[];
}

export function ExperiencesClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ExperienceData | null>(null);
  const [form, setForm] = useState<Omit<ExperienceData, "id" | "order">>(EMPTY);
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

  function openEdit(exp: ExperienceData) {
    setEditing(exp);
    setForm({ ...exp });
    setTechStackRaw(exp.techStack.join(", "));
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    const payload = editing
      ? { ...form, id: editing.id, order: editing.order }
      : { ...form, order: data.length + 1 };
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
      fetch("/api/experiences", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered.map(({ id, order }) => ({ id, order }))),
      });
      return reordered;
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif italic text-3xl text-fg">Experiences</h1>
          <p className="text-sm text-fg-muted mt-0.5">{data.length} entries — drag to reorder</p>
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
          <SortableContext items={data.map((e) => e.id)} strategy={verticalListSortingStrategy}>
            {data.map((exp) => (
              <SortableRow key={exp.id} exp={exp} onEdit={openEdit} onRemove={remove} />
            ))}
          </SortableContext>
        </DndContext>
        {data.length === 0 && (
          <p className="px-4 py-8 text-center text-fg-subtle text-sm">No experiences yet.</p>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-5 py-10 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-bg border border-border rounded-xl p-6 max-w-lg w-full shadow-xl space-y-4 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Type</label>
                <div className="flex gap-2">
                  {(["work", "edu"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={`flex-1 py-2 rounded-lg text-sm font-mono border transition-colors ${
                        form.type === t
                          ? "bg-accent text-accent-fg border-accent"
                          : "border-border text-fg-muted hover:text-fg"
                      }`}
                    >
                      {t === "work" ? "work" : "education"}
                    </button>
                  ))}
                </div>
              </div>

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
