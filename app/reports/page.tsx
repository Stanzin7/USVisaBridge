import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReportsClient } from "./ReportsClient";

export default async function ReportsPage() {
  // Server-side auth check (recommended for V1)
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  return <ReportsClient />;
}
