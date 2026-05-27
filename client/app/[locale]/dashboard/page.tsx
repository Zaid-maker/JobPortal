"use client";

import Navbar from "@/components/Navbar";
import { PageWrapper } from "@/components/PageWrapper";
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Settings, 
  User, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Applications", value: "12", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  { label: "Interviews", value: "3", icon: Clock, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Offers", value: "1", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
];

const RECENT_APPLICATIONS = [
  {
    id: 1,
    company: "Meta",
    role: "Senior Frontend Developer",
    date: "2 days ago",
    status: "Interviewing",
    statusColor: "text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400",
    location: "Remote",
  },
  {
    id: 2,
    company: "Google",
    role: "Backend Engineer",
    date: "5 days ago",
    status: "Applied",
    statusColor: "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
    location: "Mountain View, CA",
  },
  {
    id: 3,
    company: "Apple",
    role: "UI Designer",
    date: "1 week ago",
    status: "Declined",
    statusColor: "text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 dark:text-zinc-400",
    location: "Cupertino, CA",
  },
];

export default function DashboardPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, Alex 👋</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">Here's what's happening with your job applications.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-900 transition-colors shadow-sm">
                <Settings className="h-4 w-4" />
                Edit Profile
              </button>
              <Link 
                href="/jobs"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
              >
                Find Jobs
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Applications */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  >
                    <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Applications Section */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Recent Applications</h2>
                  <Link href="/dashboard/applications" className="text-sm text-blue-600 font-medium hover:underline">
                    View all
                  </Link>
                </div>
                <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-sm md:text-base">
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                    {RECENT_APPLICATIONS.map((app) => (
                      <div key={app.id} className="p-4 md:p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex gap-4">
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-900 rounded-xl flex items-center justify-center font-bold text-lg text-zinc-400">
                              {app.company[0]}
                            </div>
                            <div>
                              <h3 className="font-bold group-hover:text-blue-600 transition-colors">{app.role}</h3>
                              <p className="text-zinc-600 dark:text-zinc-400 text-sm">{app.company} • {app.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                            <div className="text-right hidden md:block">
                              <div className="text-sm text-zinc-400 flex items-center gap-1 justify-end">
                                <Calendar className="h-3 w-3" />
                                {app.date}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.statusColor}`}>
                              {app.status}
                            </span>
                            <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column: Profile & Other info */}
            <div className="space-y-8">
              
              {/* Profile Card */}
              <section className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    A
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Alex Johnson</h2>
                    <p className="text-sm text-zinc-500">Product Designer</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-zinc-400">
                       <MapPin className="h-3 w-3" />
                       San Francisco, CA
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium">Profile Strength</span>
                      <span className="text-blue-600 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="bg-blue-600 h-full rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <span>My Resume</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium whitespace-nowrap">Updated Mar 12</span>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-zinc-400" />
                        <span>Personal Info</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-300" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Suggestions/Insights */}
              <section className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -left-4 -top-4 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
                
                <h3 className="font-bold text-lg mb-2 relative z-10">Job Hunt Tip</h3>
                <p className="text-blue-50 text-sm leading-relaxed relative z-10">
                  Customizing your resume for each application increases your interview chances by <span className="font-bold underline">40%</span>.
                </p>
                <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors relative z-10">
                  Learn how
                </button>
              </section>
            </div>

          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
