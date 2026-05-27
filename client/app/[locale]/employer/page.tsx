"use client";

import Navbar from "@/components/Navbar";
import { PageWrapper } from "@/components/PageWrapper";
import { 
  Users, 
  Briefcase, 
  Eye, 
  TrendingUp, 
  PlusCircle, 
  MoreHorizontal,
  ChevronRight,
  BarChart3,
  Mail,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Candidates", value: "248", icon: Users, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20", trend: "+12%" },
  { label: "Active Jobs", value: "5", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20", trend: "Stable" },
  { label: "Job Views", value: "1.2k", icon: Eye, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", trend: "+24%" },
];

const ACTIVE_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    applicants: 42,
    newApplicants: 8,
    status: "Active",
    postedAt: "2 days ago",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    applicants: 15,
    newApplicants: 2,
    status: "Active",
    postedAt: "5 days ago",
  },
  {
    id: 3,
    title: "Backend Engineer (Go)",
    department: "Engineering",
    applicants: 28,
    newApplicants: 0,
    status: "Active",
    postedAt: "1 week ago",
  },
];

export default function EmployerDashboardPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Employer Dashboard</h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage your job listings and track applicants.</p>
            </div>
            <Link 
              href="/post-job"
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white dark:bg-white dark:text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              Post a New Job
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Stats & Job Tables */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        stat.trend.startsWith("+") 
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20" 
                          : "bg-zinc-50 text-zinc-500 dark:bg-zinc-900/40"
                      }`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Active Jobs Table */}
              <section className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Active Listings</h2>
                  <button className="text-sm text-zinc-500 hover:text-blue-600 font-medium transition-colors">View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 uppercase text-[10px] font-bold tracking-widest">
                        <th className="px-6 py-4">Job Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Applicants</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                      {ACTIVE_JOBS.map((job) => (
                        <tr key={job.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                          <td className="px-6 py-5">
                            <div className="font-bold text-zinc-900 dark:text-zinc-100">{job.title}</div>
                            <div className="text-xs text-zinc-500">{job.department} • Posted {job.postedAt}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-zinc-900 dark:text-zinc-100">{job.applicants}</span>
                              {job.newApplicants > 0 && (
                                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                                  +{job.newApplicants}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <button className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                                <BarChart3 className="h-4 w-4 text-zinc-500" />
                              </button>
                              <button className="p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            {/* Right Column: Insights & Actions */}
            <div className="space-y-8">
              
              {/* Activity Feed */}
              <section className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h3 className="font-bold text-lg mb-6">Recent Activity</h3>
                <div className="space-y-6">
                  {[
                    { type: 'applied', user: 'James Wilson', role: 'Frontend Developer', time: '2m ago' },
                    { type: 'message', user: 'Sarah Chen', role: 'Product Designer', time: '1h ago' },
                    { type: 'applied', user: 'Marko Petrovic', role: 'Backend Engineer', time: '4h ago' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`flex-none w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'applied' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/20'
                      }`}>
                        {activity.type === 'applied' ? <Zap className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {activity.user}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {activity.type === 'applied' ? 'Applied for' : 'Sent a message about'} 
                          <span className="font-medium text-zinc-700 dark:text-zinc-300 ml-1">{activity.role}</span>
                        </p>
                        <span className="text-[10px] text-zinc-400 mt-1 block">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 border-t border-zinc-100 dark:border-zinc-900 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                  View Full Feed
                  <ChevronRight className="h-3 w-3" />
                </button>
              </section>

              {/* Recruitment Health */}
              <section className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/30">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <h3 className="font-bold italic">Hiring Insights</h3>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Your "Senior Frontend Developer" role is in the <span className="text-blue-400 font-bold">top 5%</span> of most viewed jobs this week.
                </p>
                <div className="space-y-3">
                  <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">
                    Boost Visibility
                  </button>
                  <button className="w-full py-2.5 text-xs font-bold hover:underline opacity-80 decoration-dotted">
                    View Talent Analytics
                  </button>
                </div>
              </section>

              {/* Shortcut Card */}
              <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg text-emerald-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-400">Database Search</h4>
                </div>
                <p className="text-xs text-emerald-700/70 dark:text-emerald-500/70 leading-relaxed mb-4">
                  Why wait for applicants? Search our database of 10k+ verified developers.
                </p>
                <button className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 group">
                  Search Candidates 
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
