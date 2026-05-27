"use client";

import { useState, use } from "react";
import Navbar from "@/components/Navbar";
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ArrowLeft,
  Share2,
  Bookmark,
  Building2,
  CheckCircle2,
  Calendar,
  Globe,
  Zap,
  Info,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { PageWrapper } from "@/components/PageWrapper";
import { motion } from "framer-motion";

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [isSaved, setIsSaved] = useState(false);

  // Dummy data lookup (simulating fetching by id)
  const job = {
    id: resolvedParams.id,
    title: "Senior Frontend Developer",
    company: "Meta",
    companyLogo: "M",
    location: "Menlo Park, CA (Remote Friendly)",
    salary: "$160k - $220k / year",
    type: "Full-time",
    postedAt: "2 days ago",
    experience: "5+ years",
    workStyle: "Hybrid",
    description: `
      We are looking for a Senior Frontend Developer to join our core product team. 
      You will be responsible for building high-quality, scalable web applications 
      using React, Next.js, and Tailwind CSS. 
      
      As a senior member of the team, you will mentor junior developers and 
      contribute to the architectural decisions that shape our future platform.
    `,
    responsibilities: [
      "Develop new user-facing features using React.js",
      "Build reusable components and front-end libraries for future use",
      "Translate designs and wireframes into high quality code",
      "Optimize components for maximum performance across a vast array of web-capable devices and browsers",
      "Collaborate with backend engineers to integrate APIs"
    ],
    requirements: [
      "5+ years of experience with modern Javascript frameworks (React, Vue, or Angular)",
      "Strong proficiency in TypeScript and CSS-in-JS or Tailwind CSS",
      "Experience with server-side rendering and Next.js",
      "Excellent communication and teamwork skills",
      "Degree in Computer Science or equivalent practical experience"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Comprehensive healthcare (medical, dental, vision)",
      "Unlimited PTO and flexible working hours",
      "Home office stipend and wellness budget",
      "Parental leave and family support"
    ]
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans">
        <Navbar />
        
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              href="/jobs" 
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-blue-600 dark:text-zinc-400 transition-colors mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to all jobs
            </Link>
          </motion.div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Main Content */}
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-3xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 shadow-sm mb-6 sm:p-10 relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl z-0 rounded-full" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                    <div className="flex gap-5 items-start">
                      <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center font-bold text-2xl text-zinc-400 flex-none border border-zinc-100 dark:border-zinc-800 uppercase">
                        {job.companyLogo}
                      </div>
                      <div>
                        <h1 className="text-3xl font-extrabold tracking-tight mb-2 uppercase">{job.title}</h1>
                        <div className="flex flex-wrap gap-y-2 gap-x-5 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          <Link href="/companies/meta" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                            <Building2 className="h-4 w-4" /> {job.company}
                          </Link>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" /> Posted {job.postedAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setIsSaved(!isSaved)}
                        className={`p-3 rounded-xl border transition-all ${
                          isSaved 
                            ? "bg-blue-600 border-blue-600 text-white" 
                            : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                      </button>
                      <button className="p-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8 border-y border-zinc-100 dark:border-zinc-800 mb-8 font-sans">
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Salary</p>
                      <p className="font-bold text-lg text-blue-600 truncate">{job.salary}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Job Type</p>
                      <p className="font-bold text-lg">{job.type}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Experience</p>
                      <p className="font-bold text-lg">{job.experience}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Work Style</p>
                      <p className="font-bold text-lg text-emerald-600">{job.workStyle}</p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-600" />
                        About the role
                      </h2>
                      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {job.description}
                      </p>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold mb-4">What you'll do</h2>
                      <ul className="space-y-3">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-none mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold mb-4">Requirements</h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {job.requirements.map((item, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-sm font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Actions */}
            <aside className="lg:w-80 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-3xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 shadow-sm sticky top-28"
              >
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mb-4 flex items-center justify-center gap-2">
                  <Zap className="h-5 w-5 fill-current" />
                  Apply Now
                </button>
                <div className="text-center text-xs text-zinc-500 mb-6 font-medium">
                  Typically responds in <span className="font-bold text-zinc-900 dark:text-zinc-100">2 days</span>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">Department</p>
                      <p className="text-sm font-bold">Engineering</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">Remote Policy</p>
                      <p className="text-sm font-bold">Hybrid / Quarterly offsites</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">Hiring Status</p>
                      <p className="text-sm font-bold text-emerald-600">Active</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xs font-extrabold uppercase text-zinc-400 tracking-widest mb-4">Job Benefits</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.slice(0, 3).map((benefit, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                        {benefit}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-[10px] font-bold text-zinc-600 dark:text-zinc-400">
                      +2 more
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Company Teaser */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-6 rounded-3xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">M</div>
                  <div>
                    <h3 className="font-bold">About {job.company}</h3>
                    <p className="text-xs text-zinc-500">10k+ employees • Menlo Park</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-zinc-500 font-medium">
                  Building the future of social connection. Join us to help people connect, find communities and grow businesses.
                </p>
                <Link href="/companies/meta" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 group">
                  View company profile <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </aside>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
