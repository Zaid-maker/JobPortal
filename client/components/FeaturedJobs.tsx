"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export default function FeaturedJobs() {
  const t = useTranslations("FeaturedJobs");

  const featuredJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $210k",
      type: t("types.fullTime"),
      postedAt: "12h ago",
      logoBg: "bg-blue-100",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Product Designer",
      company: "Meta",
      location: t("locations.remote"),
      salary: "$130k - $180k",
      type: t("types.fullTime"),
      postedAt: "2d ago",
      logoBg: "bg-indigo-100",
      color: "text-indigo-600"
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$140k - $195k",
      type: t("types.contract"),
      postedAt: "1d ago",
      logoBg: "bg-orange-100",
      color: "text-orange-600"
    },
    {
      id: 4,
      title: "Frontend Lead",
      company: "Apple",
      location: "Cupertino, CA",
      salary: "$160k - $220k",
      type: t("types.fullTime"),
      postedAt: "5h ago",
      logoBg: "bg-zinc-100",
      color: "text-zinc-900"
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$180k - $250k",
      type: t("types.fullTime"),
      postedAt: "3d ago",
      logoBg: "bg-red-100",
      color: "text-red-600"
    },
    {
      id: 6,
      title: "DevOps Architect",
      company: "Microsoft",
      location: t("locations.remote"),
      salary: "$155k - $215k",
      type: t("types.fullTime"),
      postedAt: "1w ago",
      logoBg: "bg-sky-100",
      color: "text-sky-600"
    }
  ];

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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-4xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all duration-300 shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 ${job.logoBg} rounded-2xl flex items-center justify-center font-bold text-xl ${job.color} shadow-inner`}>
                  {job.company[0]}
                </div>
                <span className="px-3 py-1 bg-white dark:bg-zinc-800 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-zinc-100 dark:border-zinc-700">
                  {job.type}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">
                    {job.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-bold text-sm mt-1">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs font-bold text-zinc-400 uppercase tracking-tighter">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-zinc-300" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 font-sans">
                    <DollarSign className="h-4 w-4 text-emerald-500" />
                    {job.salary}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {job.postedAt}
                  </span>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group/link"
                  >
                    View details
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
