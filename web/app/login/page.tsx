"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8, "Min 8 characters"),
});
type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } =
    useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    try {
      await api("/api/login", { method: "POST", body: JSON.stringify(data) });
      router.push("/boards");
    } catch (e) {
      if (e instanceof ApiError && e.errors?.email) {
        setError("email", { message: e.errors.email[0] });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-24 flex max-w-sm flex-col gap-3">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <input {...register("email")} placeholder="Email" className="rounded border p-2" />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      <input {...register("password")} type="password" placeholder="Password" className="rounded border p-2" />
      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
      <button disabled={isSubmitting} className="rounded bg-black p-2 text-white">Log in</button>
    </form>
  );
}