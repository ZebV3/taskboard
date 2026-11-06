"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useBoard, useBoardMutations } from "@/lib/board-detail";
import AddForm from "@/components/board/AddForm";
import ListColumn from "@/components/board/ListColumn";

export default function BoardPage() {
  const id = Number(useParams<{ id: string }>().id);
  const { data: board, isLoading, error } = useBoard(id);
  const m = useBoardMutations(id);

  if (isLoading) return <p className="p-8">Loading…</p>;
  if (error || !board) return <p className="p-8 text-red-600">Board not found.</p>;

  return (
    <main className="flex h-screen flex-col" style={{ backgroundColor: board.color }}>
      <header className="flex items-center gap-4 bg-black/20 px-6 py-3 text-white">
        <Link href="/boards" className="text-sm underline">← Boards</Link>
        <h1 className="text-xl font-semibold">{board.title}</h1>
      </header>

      <div className="flex flex-1 items-start gap-4 overflow-x-auto p-6">
        {board.lists.map((list) => (
          <ListColumn key={list.id} list={list} m={m} />
        ))}
        <div className="w-72 shrink-0 rounded-lg bg-white/30 p-3">
          <AddForm placeholder="Add a list" pending={m.addList.isPending}
            onAdd={(title) => m.addList.mutate(title)} />
        </div>
      </div>
    </main>
  );
}