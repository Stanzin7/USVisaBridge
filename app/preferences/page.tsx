import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PreferencesClient } from "./PreferencesClient";

export default async function PreferencesPage() {
  // Server-side auth check (recommended for V1)
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  return <PreferencesClient />;
}

