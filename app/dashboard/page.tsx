import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

type Preference = {
  id: string;
  user_id: string;
  visa_type: string;
  consulate: string;
  date_start: string | null;
  date_end: string | null;
  channels: string[];
  quiet_hours_start: number;
  quiet_hours_end: number;
  created_at: string;
  updated_at: string;
};

function getTimeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  /* ------------------------------ Fetch user preferences ----------------------------- */
  const {
    data: preferences,
    error: preferencesError,
  }: {
    data: Preference[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from("preferences")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

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

  // Check if last verified report is older than 6 hours
  const lastReportTime = reports && reports.length > 0 
    ? new Date(reports[0].created_at).getTime()
    : null;
  const sixHoursAgo = Date.now() - (6 * 60 * 60 * 1000);
  const isStale = lastReportTime !== null && lastReportTime < sixHoursAgo;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Your visa slot alerts and recent reports
        </p>
      </div>

      <div className="space-y-8">
        {/* Question 1: Do I have alerts set up? */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Do I have alerts set up?</h2>
          {!preferences || preferences.length === 0 ? (
            <Card className="bg-primary/10 border-primary/30">
              <CardHeader>
                <CardTitle>Set up your first alert</CardTitle>
                <CardDescription>
                  Get notified when slots become available for your visa type and consulate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild>
                  <Link href="/preferences">Set up alerts</Link>
                </Button>
                <p className="text-sm text-muted-foreground">
                  No passwords. No bots. You book on the official site.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Your active alerts ({preferences.length})</CardTitle>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/preferences">Manage alerts</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {preferences.slice(0, 3).map((pref) => (
                    <div key={pref.id} className="flex justify-between items-start py-2 border-b last:border-0">
                      <div>
                        <p className="font-semibold">{pref.visa_type} - {pref.consulate}</p>
                        {pref.date_start && (
                          <p className="text-sm text-muted-foreground">
                            {new Date(pref.date_start).toLocaleDateString()}
                            {pref.date_end && ` to ${new Date(pref.date_end).toLocaleDateString()}`}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Channels: {pref.channels.join(', ')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Question 2: Is anything happening right now? */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Is anything happening right now?</h2>
          <Card>
            <CardHeader>
              <CardTitle>Latest verified sightings</CardTitle>
              <CardDescription>Based on community proof uploads</CardDescription>
            </CardHeader>
            <CardContent>
              {reports && reports.length > 0 ? (
                <div className="space-y-3">
                  {reports.map((report) => (
                    <div key={report.id} className="flex justify-between items-start py-2 border-b last:border-0">
                      <div>
                        <p className="font-semibold">{report.visa_type} - {report.consulate}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.earliest_date).toLocaleDateString()}
                          {report.latest_date && report.latest_date !== report.earliest_date && (
                            <> - {new Date(report.latest_date).toLocaleDateString()}</>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded">
                          Last seen {getTimeAgo(report.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isStale && (
                    <div className="mt-4 pt-4 border-t text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        Nothing fresh recently
                      </p>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/reports">Submit a Sighting (Upload Proof)</Link>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">
                    No recent sightings. Be the first to submit proof!
                  </p>
                  <Button asChild>
                    <Link href="/reports">Submit a Sighting (Upload Proof)</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Question 3: What should I do next? */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">What should I do next?</h2>
          {!preferences || preferences.length === 0 ? (
            <div className="max-w-md">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Sighting (Upload Proof)</CardTitle>
                  <CardDescription>
                    Help the community by reporting available slots
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/reports">Submit a Sighting (Upload Proof)</Link>
                  </Button>
                  <p className="text-center">
                    <Link href="/preferences" className="text-sm text-muted-foreground hover:text-foreground">
                      Set up alerts →
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manage alerts</CardTitle>
                  <CardDescription>
                    Get notified when slots match your preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/preferences">Manage alerts</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Sighting (Upload Proof)</CardTitle>
                  <CardDescription>
                    Help the community by reporting available slots
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/reports">Submit a Sighting (Upload Proof)</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
