import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostgrestError } from "@supabase/supabase-js";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type SlotReport = {
  id: string;
  reporter_id: string | null;
  consulate: string;
  visa_type: string;
  earliest_date: string;
  latest_date: string | null;
  screenshot_path: string | null;
  source: string;
  confidence: number;
  status: "pending" | "verified" | "rejected";
  created_at: string;
  updated_at: string;
};

type Alert = {
  id: string;
  user_id: string;
  report_id: string;
  channel: "email" | "sms" | "push";
  status: "pending" | "sent" | "failed";
  error: string | null;
  sent_at: string | null;
  dedupe_key: string;
  created_at: string;
  slot_reports?: SlotReport | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  /* ------------------------------ Fetch verified reports ----------------------------- */
  const {
    data: reports,
    error: reportsError,
  }: {
    data: SlotReport[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from("slot_reports")
    .select("*")
    .eq("status", "verified")
    .order("created_at", { ascending: false })
    .limit(20);

  /* ------------------------------ Fetch user's alerts ----------------------------- */
  const {
    data: alerts,
    error: alertsError,
  }: {
    data: Alert[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from("alerts")
    .select(
      `
      *,
      slot_reports (*)
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Your visa slot alerts and recent reports
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Verified Reports */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Verified Slots</h2>
          {reports && reports.length > 0 ? (
            <div className="space-y-4">
              {/* {reports.map((report) => (
                <div key={report.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{report.visa_type}</p>
                      <p className="text-sm text-gray-600">
                        {report.consulate}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(report.earliest_date).toLocaleDateString()}
                        {report.latest_date &&
                          report.latest_date !== report.earliest_date && (
                            <>
                              {" "}
                              -{" "}
                              {new Date(
                                report.latest_date
                              ).toLocaleDateString()}
                            </>
                          )}
                      </p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified
                    </span>
                  </div>
                </div>
              ))} */}
            </div>
          ) : (
            <p className="text-gray-500">No verified reports yet</p>
          )}
        </div>

        {/* Alert History */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Your Alert History</h2>
          {alerts && alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">
                        {alert.slot_reports?.visa_type} -{" "}
                        {alert.slot_reports?.consulate}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(alert.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        alert.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : alert.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-500 mb-4">No alerts yet</p>
              <Link
                href="/preferences"
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Set up alert preferences →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
