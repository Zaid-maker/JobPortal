"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  createdAt: string;
}

export default function FeaturedJobs() {
  const t = useTranslations("FeaturedJobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs");
        if (response.ok) {
          const data = await response.json();
          // For featured, we'll just take the first 6 for now
          setJobs(data.slice(0, 6));
        }
      } catch (error) {
        console.error("Failed to fetch featured jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const getLogoBg = (index: number) => {
    const bgs = ["bg-blue-100", "bg-indigo-100", "bg-orange-100", "bg-zinc-100", "bg-red-100", "bg-sky-100"];
    return bgs[index % bgs.length];
  };

  const getTextColor = (index: number) => {
    const colors = ["text-blue-600", "text-indigo-600", "text-orange-600", "text-zinc-900", "text-red-600", "text-sky-600"];
    return colors[index % colors.length];
  };

  return (
    <section className="py-24 bg-white dark:bg-black/50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              {t("badge")}
            </div>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white sm:text-4xl tracking-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl font-medium">
              {t("subtitle")}
            </p>
          </div>
          <Link 
            href="/jobs" 
            className="group inline-flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {t("btnExplore")}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-950 rounded-4xl border border-zinc-100 dark:border-zinc-800">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
                <p className="text-zinc-500 font-medium tracking-tight">Discovering opportunities...</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
                <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-4xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
                >
                <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 ${getLogoBg(index)} rounded-2xl flex items-center justify-center text-xl font-black ${getTextColor(index)} transform group-hover:scale-110 transition-transform duration-500`}>
                    {job.company[0]}
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800 px-3 py-1 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {job.type}
                    </div>
                </div>
                
                <div>
                    <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
                    {job.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm mb-6 flex items-center gap-1">
                    {job.company}
                    </p>
                    
                    <div className="space-y-4">
                    <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        {job.location}
                    </div>
                    <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100 text-sm font-bold">
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                        {job.salary}
                    </div>
                    </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] items-center gap-1.5 text-zinc-400 font-bold uppercase tracking-widest flex">
                    <Clock className="h-3 w-3" />
                    {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <Link 
                    href={`/jobs/${job.id}`} 
                    className="text-sm font-extrabold text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-2"
                    >
                    {t("viewDetails")}
                    </Link>
                </div>
                </motion.div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
}
