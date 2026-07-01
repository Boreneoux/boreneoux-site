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
import type { SkillData } from "@/types";

const CATEGORIES = ["frontend", "backend", "mobile", "tools"] as const;

const EMPTY: Omit<SkillData, "id" | "order"> = {
  name: "",
  icon: "",
  category: "frontend",
};

function SortableSkill({
  skill,
  onEdit,
  onRemove,
}: {
  skill: SkillData;
  onEdit: (s: SkillData) => void;
  onRemove: (id: string) => Promise<void>;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: skill.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-2 px-4 py-2.5 border-b border-border-muted last:border-0 bg-bg ${isDragging ? "opacity-50 shadow-md rounded-lg" : ""}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="text-fg-subtle/40 hover:text-fg-subtle transition-colors cursor-grab active:cursor-grabbing touch-none shrink-0"
        aria-label="Drag to reorder"
      >
        <GripVertical size={13} />
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-fg font-medium truncate">{skill.name}</p>
        <p className="font-mono text-xs text-fg-subtle truncate">{skill.icon}</p>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit(skill)}
          className="p-1.5 text-fg-subtle hover:text-accent transition-colors"
        >
          <Pencil size={13} />
        </button>
        <DeleteDialog onConfirm={() => onRemove(skill.id)} label="skill" />
      </div>
    </div>
  );
}

interface Props {
  initialData: SkillData[];
}

export function SkillsClient({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SkillData | null>(null);
  const [form, setForm] = useState<Omit<SkillData, "id" | "order">>(EMPTY);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function openAdd() {
    setEditing(null);
    setForm(EMPTY);
    setModalOpen(true);
  }

  function openEdit(skill: SkillData) {
    setEditing(skill);
    setForm({ ...skill });
    setModalOpen(true);
  }

  async function save() {
    setSaving(true);
    const catItems = data.filter((s) => s.category === form.category);
    const payload = editing
      ? { ...form, id: editing.id, order: editing.order }
      : { ...form, order: catItems.length + 1 };
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/skills", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (editing) {
      setData((d) => d.map((s) => (s.id === editing.id ? result : s)));
    } else {
      setData((d) => [...d, result]);
    }
    setSaving(false);
    setModalOpen(false);
  }

  async function remove(id: string) {
    await fetch("/api/skills", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setData((d) => d.filter((s) => s.id !== id));
  }

  function handleDragEnd(cat: string) {
    return (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      setData((items) => {
        const catItems = items.filter((s) => s.category === cat);
        const others = items.filter((s) => s.category !== cat);
        const oldIndex = catItems.findIndex((s) => s.id === active.id);
        const newIndex = catItems.findIndex((s) => s.id === over.id);
        const reordered = arrayMove(catItems, oldIndex, newIndex).map((s, i) => ({
          ...s,
          order: i + 1,
        }));
        fetch("/api/skills", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reordered.map(({ id, order }) => ({ id, order }))),
        });
        return [...others, ...reordered];
      });
    };
  }

  const grouped = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = data.filter((s) => s.category === cat).sort((a, b) => a.order - b.order);
      return acc;
    },
    {} as Record<string, SkillData[]>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif italic text-3xl text-fg">Skills</h1>
          <p className="text-sm text-fg-muted mt-0.5">{data.length} total — drag to reorder within category</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-fg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={15} /> Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="rounded-xl border border-border-muted overflow-hidden">
            <div className="bg-bg-surface px-4 py-2 border-b border-border-muted">
              <span className="font-mono text-xs uppercase tracking-widest text-accent-alt">
                {cat}
              </span>
            </div>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd(cat)}
            >
              <SortableContext
                items={grouped[cat].map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {grouped[cat].map((skill) => (
                  <SortableSkill
                    key={skill.id}
                    skill={skill}
                    onEdit={openEdit}
                    onRemove={remove}
                  />
                ))}
              </SortableContext>
            </DndContext>
            {grouped[cat].length === 0 && (
              <p className="px-4 py-4 text-xs text-fg-subtle text-center">Empty</p>
            )}
          </div>
        ))}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-5"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-bg border border-border rounded-xl p-6 max-w-sm w-full shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif italic text-2xl text-fg">
              {editing ? "Edit Skill" : "Add Skill"}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">
                  Icon (React Icons key, e.g. SiTypescript)
                </label>
                <input
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm font-mono text-fg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-fg-subtle mb-1 uppercase">Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value as SkillData["category"] }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-sm text-fg focus:outline-none focus:border-accent"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
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
