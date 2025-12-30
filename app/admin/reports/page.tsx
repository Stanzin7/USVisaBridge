"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Report {
  id: string;
  consulate: string;
  visa_type: string;
  earliest_date: string;
  latest_date: string | null;
  screenshot_path: string | null;
  confidence: number;
  status: string;
  created_at: string;
  profiles?: {
    email: string;
    full_name: string | null;
  };
}

export default function AdminReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/reports?status=pending");
      if (res.status === 403) {
        router.push("/dashboard");
        return;
      }
      const data = await res.json();
      if (data.data) {
        setReports(data.data);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDecision = async (
    reportId: string,
    decision: "verified" | "rejected"
  ) => {
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });

      if (res.ok) {
        setMessage(`Report ${decision} successfully`);
        fetchReports();
      } else {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error processing decision");
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin: Review Reports</h1>
        <p className="text-gray-600">Review and verify pending slot reports</p>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("Error")
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {reports.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">No pending reports to review</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {report.visa_type} - {report.consulate}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reported by: {report.profiles?.email || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Confidence: {(report.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm">
                  <strong>Earliest Date:</strong>{" "}
                  {new Date(report.earliest_date).toLocaleDateString()}
                </p>
                {report.latest_date && (
                  <p className="text-sm">
                    <strong>Latest Date:</strong>{" "}
                    {new Date(report.latest_date).toLocaleDateString()}
                  </p>
                )}
              </div>

              {report.screenshot_path && (
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Screenshot:</p>
                  <div className="relative max-w-md border rounded overflow-hidden">
                    <Image
                      src={`/api/screenshots/${encodeURIComponent(
                        report.screenshot_path
                      )}`}
                      alt="Report screenshot"
                      width={800}
                      height={600}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => handleDecision(report.id, "verified")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDecision(report.id, "rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
