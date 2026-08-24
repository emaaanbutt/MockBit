"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function safeNext(next: string) {
  if (!next.startsWith("/")) return "/history";
  if (next.startsWith("//")) return "/history";
  if (next.startsWith("/login") || next.startsWith("/signup")) return "/history";
  return next;
}

function authRedirect(path: "/login" | "/signup", messageType: "error" | "message", message: string, next?: string) {
  const params = new URLSearchParams({ [messageType]: message });
  if (next) params.set("next", next);
  redirect(`${path}?${params.toString()}`);
}

export async function login(formData: FormData) {
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = safeNext(getString(formData, "next") || "/history");

  if (!email || !password) {
    authRedirect("/login", "error", "Please enter both email and password.", next);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    authRedirect("/login", "error", error.message, next);
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const name = getString(formData, "name");
  const email = getString(formData, "email");
  const password = getString(formData, "password");
  const next = safeNext(getString(formData, "next") || "/history");

  if (!name || !email || !password) {
    authRedirect("/signup", "error", "Please fill in name, email, and password.", next);
  }

  if (password.length < 6) {
    authRedirect("/signup", "error", "Password must be at least 6 characters.", next);
  }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`
    }
  });

  if (error) {
    authRedirect("/signup", "error", error.message, next);
  }

  revalidatePath("/", "layout");

  if (data.session) {
    redirect(next);
  }

  authRedirect("/login", "message", "Account created. Check your email to confirm, then login.", next);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
