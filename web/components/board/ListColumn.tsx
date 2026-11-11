"use client";
import type { BoardList, useBoardMutations } from "@/lib/board-detail";
import AddForm from "./AddForm";

type Props = { 
  list: BoardList;
  m: ReturnType<typeof useBoardMutations>;
};

export default function ListColumn({ list, m }: Props) {
  return (
    <section className="flex max-h-full w-72 shrink-0 flex-col bg-white/30 rounded-lg p-3">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">{list.title}</h2>
        <div className="flex gap-2 text-xs text-gray-200">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer" onClick={() => {
            const t = prompt("Rename list", list.title);
            if (t?.trim()) m.renameList.mutate({ id: list.id, title: t.trim() });
          }}>Rename</button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer" onClick={() => confirm("Delete this list and its cards?") && m.deleteList.mutate(list.id)}>
            Delete
          </button>
        </div>
      </header>

      <ul className="mb-3 flex flex-col gap-2 overflow-y-auto">
        {list.cards.map((c) => (
          <li key={c.id} className="rounded bg-white/50 p-2 text-sm shadow-sm">
            <p className="pb-4 text-gray-700">{c.title}</p>
            {c.due_date && <p className="mt-1 text-xs text-gray-500">Due {c.due_date}</p>}
            <div className="mt-2 flex gap-2 text-xs text-gray-500">
              <button className="p-2 font-semibold bg-white/90 hover:bg-white/60 rounded-full cursor-pointer" onClick={() => {
                const t = prompt("Edit card", c.title);
                if (t?.trim()) m.updateCard.mutate({ id: c.id, title: t.trim() });
              }}>Edit</button>
              <button className="p-2 font-semibold bg-white/90 hover:bg-white/60 rounded-full cursor-pointer" onClick={() => confirm("Delete this card?") && m.deleteCard.mutate(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <AddForm placeholder="Add a card" pending={m.addCard.isPending}
        onAdd={(title) => m.addCard.mutate({ listId: list.id, title })} />
    </section>
  );
}