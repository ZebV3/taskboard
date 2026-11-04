import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export type Board = { id: number; title: string; color: string; created_at: string };
type Payload = { title: string; color?: string };

export const useBoards = () =>
  useQuery({
    queryKey: ["boards"],
    queryFn: async () => (await api<{ data: Board[] }>("/api/boards")).data,
  });

export const useCreateBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: Payload) =>
      api<{ data: Board }>("/api/boards", { method: "POST", body: JSON.stringify(p) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["boards"] }),
  });
};

export const useUpdateBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...p }: Payload & { id: number }) =>
      api<{ data: Board }>(`/api/boards/${id}`, { method: "PUT", body: JSON.stringify(p) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["boards"] }),
  });
};

export const useDeleteBoard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api<void>(`/api/boards/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["boards"] }),
  });
};