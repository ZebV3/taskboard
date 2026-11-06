"use client"
import { useState } from "react";

export default function AddForm({placeholder, onAdd, pending}: {placeholder: string; onAdd: (value: string) => void; pending?: boolean}) {
    const [value, setValue] = useState("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (!value.trim()) return;
            onAdd(value.trim());
            setValue("");
        }}
        className="flex gap-2">
            <input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-w-0 flex-1 rounded border p-2 text-sm"
            placeholder={placeholder}
            />
            <button disabled={pending} className="rounded bg-black px-3 text-sm text-white">Add</button>
        </form>
    );
}