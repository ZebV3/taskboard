"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api, ApiError } from "@/lib/api";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email(),
    password: z.string().min(8, "Min 8 characters"),
    password_confirmation: z.string(),
  })
  .refine((d) => d.password === d.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
type Form = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form) => {
    setServerError("");
    try {
      await api("/api/register", { method: "POST", body: JSON.stringify(data) });
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
      if (e instanceof ApiError) {
        if (e.errors) {
          Object.entries(e.errors).forEach(([field, msgs]) =>
            setError(field as keyof Form, { message: msgs[0] })
          );
        }
        setServerError(e.message);
      } else {
        setServerError("Network error: check the API is running and CORS is set up.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errs) => console.log("Validation failed:", errs))}
      className="mx-auto mt-24 flex max-w-sm flex-col gap-3"
    >
      <h1 className="text-2xl font-semibold">Register</h1>
      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <input {...register("name")} placeholder="Name" className="rounded border p-2" />
      {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

      <input {...register("email")} placeholder="Email" className="rounded border p-2" />
      {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

      <input {...register("password")} type="password" placeholder="Password" className="rounded border p-2" />
      {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

      <input {...register("password_confirmation")} type="password" placeholder="Confirm password" className="rounded border p-2" />
      {errors.password_confirmation && (
        <p className="text-sm text-red-600">{errors.password_confirmation.message}</p>
      )}

      <button disabled={isSubmitting} className="rounded bg-black p-2 text-white">
        {isSubmitting ? "Creating…" : "Register"}
      </button>
    </form>
  );
}