"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

type Props = {
  jobId: string;
};

export default function ApplyButton({ jobId }: Props) {
  const t = useTranslations("JobDetails");
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
        }),
      });

      if (res.ok) {
        setApplied(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to apply");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (applied) {
    return (
      <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 px-8 py-4 rounded-2xl font-bold border border-emerald-100 dark:border-emerald-800/30">
        <CheckCircle2 className="h-5 w-5" />
        Applied Successfully
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-auto">
      <button 
        onClick={handleApply}
        disabled={loading}
        className="w-full md:flex-none bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2 uppercase disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Zap className="h-5 w-5 fill-current" />
        )}
        {t("applyNow")}
      </button>
      {error && <p className="text-xs text-rose-500 font-medium text-center">{error}</p>}
    </div>
  );
}
