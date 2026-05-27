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
          className="group flex items-center gap-2 bg-zinc-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-xl shadow-zinc-500/10"
        >
          {t("btnViewAll")}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(job.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
          >
            {/* Hover Accent */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

            <div className="flex justify-between items-start mb-6 relative">
              <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center font-bold text-xl text-zinc-400 border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform duration-500">
                {job.logo}
              </div>
              <button className="p-2 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 relative">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                {job.title}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {job.company}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {job.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-lg text-xs font-bold text-zinc-500 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-900 relative">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">{job.salary}</span>
                <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" />
                  {job.postedAt}
                </span>
              </div>
              
              <Link
                href={`/jobs/${job.id}`}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-blue-500/40 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
              >
                {t("viewDetails")}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
