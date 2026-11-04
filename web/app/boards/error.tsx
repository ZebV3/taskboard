"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <p className="text-red-600">Something went wrong.</p>
      <button onClick={reset} className="mt-2 underline">Try again</button>
    </div>
  );
}