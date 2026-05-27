"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, ArrowRight, Bookmark, Building2, Zap, LayoutGrid } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function LatestJobs() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const t = useTranslations("LatestJobs");

  const latestJobs = [
    {
      id: "lj-1",
      title: "Senior Product Designer",
      company: "Airbnb",
      logo: "A",
      location: t("locations.remote"),
      salary: "$140k - $190k",
      type: t("types.fullTime"),
      postedAt: "4 hours ago",
      tags: ["Product", "Design", "UI/UX"]
    },
    {
      id: "lj-2",
      title: "Cloud Infrastructure Engineer",
      company: "Vercel",
      logo: "V",
      location: "SF / Remote",
      salary: "$165k - $230k",
      type: t("types.fullTime"),
      postedAt: "6 hours ago",
      tags: ["DevOps", "AWS", "Next.js"]
    },
    {
      id: "lj-3",
      title: "Marketing Growth Lead",
      company: "Stripe",
      logo: "S",
      location: "New York, NY",
      salary: "$130k - $175k",
      type: t("types.fullTime"),
      postedAt: "8 hours ago",
      tags: ["Marketing", "Growth", "Data"]
    },
    {
      id: "lj-4",
      title: "Senior Frontend Developer",
      company: "Meta",
      logo: "M",
      location: "Menlo Park, CA",
      salary: "$160k - $220k",
      type: t("types.fullTime"),
      postedAt: "10 hours ago",
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: "lj-5",
      title: "Data Scientist (AI/ML)",
      company: "OpenAI",
      logo: "O",
      location: "San Francisco, CA",
      salary: "$180k - $250k",
      type: t("types.fullTime"),
      postedAt: "12 hours ago",
      tags: ["Python", "PyTorch", "AI"]
    },
    {
      id: "lj-6",
      title: "Technical Content Writer",
      company: "HashiCorp",
      logo: "H",
      location: t("locations.remote"),
      salary: "$90k - $130k",
      type: t("types.contract"),
      postedAt: "1 day ago",
      tags: ["Technical Writing", "Terraform", "Docs"]
    }
  ];

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
                Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
