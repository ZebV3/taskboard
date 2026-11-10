import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type { Board } from "./boards";

export type Card = {
  id: number; title: string; description: string | null; position: number; due_date: string | null;
};
export type BoardList = { id: number; title: string; position: number; cards: Card[] };
export type BoardDetail = Board & { lists: BoardList[] };

type CardPatch = { id: number; title?: string; description?: string | null; due_date?: string | null };
const json = (method: string, body?: unknown) => ({ method, body: body ? JSON.stringify(body) : undefined });

export const useBoard = (id: number) =>
  useQuery({
    queryKey: ["board", id],
    queryFn: async () => (await api<{ data: BoardDetail }>(`/api/boards/${id}`)).data,
  });

export function useBoardMutations(boardId: number) {
  const qc = useQueryClient();
  const onSuccess = () => qc.invalidateQueries({ queryKey: ["board", boardId] });

  return {
    addList: useMutation({
      mutationFn: (title: string) => api(`/api/boards/${boardId}/lists`, json("POST", { title })),
      onSuccess,
    }),
    renameList: useMutation({
      mutationFn: ({ id, title }: { id: number; title: string }) =>
        api(`/api/lists/${id}`, json("PUT", { title })),
      onSuccess,
    }),
    deleteList: useMutation({
      mutationFn: (id: number) => api(`/api/lists/${id}`, json("DELETE")),
      onSuccess,
    }),
    addCard: useMutation({
      mutationFn: ({ listId, title }: { listId: number; title: string }) =>
        api(`/api/lists/${listId}/cards`, json("POST", { title })),
      onSuccess,
    }),
    updateCard: useMutation({
      mutationFn: ({ id, ...patch }: CardPatch) => api(`/api/cards/${id}`, json("PUT", patch)),
      onSuccess,
    }),
    deleteCard: useMutation({
      mutationFn: (id: number) => api(`/api/cards/${id}`, json("DELETE")),
      onSuccess,
    }),
  };
}