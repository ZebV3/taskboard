"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    api<typeof user>("/api/user").then(setUser).catch(() => router.replace("/login"));
  }, [router]);

  const logout = async () => {
    await api("/api/logout", { method: "POST" });
    router.push("/login");
  };

  if (!user) return <p className="p-8">Loading…</p>;
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">Welcome, {user.name}</h1>
      <button onClick={logout} className="mt-4 rounded border px-3 py-1">Log out</button>
    </main>
  );
}