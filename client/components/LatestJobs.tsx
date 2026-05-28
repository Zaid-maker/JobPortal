"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight, Bookmark, Building2, Zap, LayoutGrid, Loader2 } from "lucide-react";
import { Link } from "@/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

export default function LatestJobs() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations("LatestJobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs");
        if (response.ok) {
          const data = await response.json();
          // For latest, we'll take the first 6 (which are descending by createdAt)
          setJobs(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch latest jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/5 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap className="h-3 w-3 fill-current" />
            {t("badge")}
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl tracking-tight">
            {t("title")}
          </h2>
        </div>
        
        <Link 
          href="/jobs"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800"
        >
          {t("btnViewAll")}
          <LayoutGrid className="h-4 w-4 group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-zinc-950/50 rounded-4xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
            <p className="text-zinc-500 font-medium tracking-tight">Updating latest openings...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              onMouseEnter={() => setHoveredId(job.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-2xl font-black text-zinc-400 border border-zinc-100 dark:border-zinc-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-600 transition-colors">
                  {job.company[0]}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <Link href={`/jobs/${job.id}`} className="text-lg font-extrabold text-zinc-900 dark:text-white hover:text-blue-600 transition-colors">
                      {job.title}
                    </Link>
                    <button className="text-zinc-300 hover:text-rose-500 transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm mb-4 flex items-center gap-1.5 focus:text-blue-600">
                    <Building2 className="h-3.5 w-3.5" />
                    {job.company}
                  </p>
                  
                  <div className="flex flex-wrap gap-y-3 gap-x-6 items-center">
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                      <MapPin className="h-3.5 w-3.5 text-rose-500" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 text-xs font-bold uppercase tracking-wider">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                      {job.salary}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-3 py-1 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {job.type}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="p-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
