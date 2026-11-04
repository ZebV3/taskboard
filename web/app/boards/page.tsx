"use client";
import { useState } from "react";
import { useBoards, useCreateBoard, useUpdateBoard, useDeleteBoard } from "@/lib/boards";

export default function BoardsPage() {
  const { data: boards, isLoading, error } = useBoards();
  const create = useCreateBoard();
  const update = useUpdateBoard();
  const remove = useDeleteBoard();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#3b82f6");

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    create.mutate({ title, color }, { onSuccess: () => setTitle("") });
  };

  if (isLoading) return <p className="p-8">Loading…</p>;
  if (error) return <p className="p-8 text-red-600">Failed to load boards.</p>;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Your boards</h1>

      <form onSubmit={onCreate} className="mb-8 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="New board title" className="flex-1 rounded border p-2" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
          className="h-10 w-12 rounded border" />
        <button disabled={create.isPending} className="rounded bg-black px-4 text-white">
          {create.isPending ? "Adding…" : "Add"}
        </button>
      </form>

      {boards?.length === 0 && <p className="text-gray-500">No boards yet. Create one above.</p>}

      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {boards?.map((b) => (
          <li key={b.id} style={{ backgroundColor: b.color }}
            className="flex h-28 flex-col justify-between rounded p-3 text-white">
            <span className="font-medium">{b.title}</span>
            <div className="flex gap-3 text-sm">
              <button onClick={() => {
                const t = prompt("Rename board", b.title);
                if (t) update.mutate({ id: b.id, title: t, color: b.color });
              }}>Rename</button>
              <button onClick={() => confirm("Delete this board?") && remove.mutate(b.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}