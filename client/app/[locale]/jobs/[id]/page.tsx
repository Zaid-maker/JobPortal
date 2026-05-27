import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageWrapper } from "@/components/PageWrapper";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link, useRouter } from "@/navigation";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Briefcase, 
  Calendar, 
  Share2, 
  Bookmark, 
  ArrowLeft,
  ChevronRight,
  Globe,
  Users,
  CheckCircle2,
  Zap
} from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

async function getJobData(id: string) {
  try {
    const res = await fetch(`http://localhost:3001/api/jobs/${id}`, {
      next: { revalidate: 60 } // optional: cache for 1 minute
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch job data:", error);
    return null;
  }
}

export default async function JobDetailsPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobData(id);
  const t = await getTranslations("JobDetails");

  if (!job) {
    notFound();
  }

  // Format date helper
  const postedDate = new Date(job.createdAt).toLocaleDateString();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black">
        <Navbar />
        
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm font-bold text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/jobs" className="hover:text-blue-600 transition-colors">Jobs</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-zinc-900 dark:text-white truncate">{job.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Job Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Card */}
              <div className="bg-white dark:bg-zinc-900/50 rounded-4xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
                
                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-zinc-400 border border-zinc-100 dark:border-zinc-700">
                      {job.company[0]}
                    </div>
                    <div>
                      <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-2 uppercase">
                        {job.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="h-4 w-4 text-blue-500" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-rose-500" />
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 flex items-center gap-2 uppercase">
                      <Zap className="h-5 w-5 fill-current" />
                      {t("applyNow")}
                    </button>
                    <button className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-rose-500 transition-all shadow-sm">
                      <Bookmark className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-50 dark:border-zinc-800/50 text-center sm:text-left">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400">Salary</span>
                    <p className="text-zinc-900 dark:text-white font-bold">{job.salary}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400">Type</span>
                    <p className="text-zinc-900 dark:text-white font-bold uppercase">{job.type}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400">Experience</span>
                    <p className="text-zinc-900 dark:text-white font-bold">{job.category}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-zinc-400">Posted</span>
                    <p className="text-zinc-900 dark:text-white font-bold">{postedDate}</p>
                  </div>
                </div>
              </div>

              {/* Description sections */}
              <div className="bg-white dark:bg-zinc-900/50 rounded-4xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-12">
                <section>
                  <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                    {t("aboutRole")}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                    {job.description}
                  </p>
                </section>

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-emerald-500 rounded-full" />
                      {t("responsibilities")}
                    </h2>
                    <ul className="space-y-4">
                      {job.responsibilities.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {job.requirements && job.requirements.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-amber-500 rounded-full" />
                      {t("requirements")}
                    </h2>
                    <ul className="space-y-4">
                      {job.requirements.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-4 text-zinc-600 dark:text-zinc-400 font-medium">
                          <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {job.benefits && job.benefits.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-purple-500 rounded-full" />
                      {t("benefits")}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {job.benefits.map((benefit: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <Zap className="h-5 w-5" />
                          </div>
                          <span className="text-zinc-700 dark:text-zinc-300 font-bold text-sm tracking-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="space-y-8">
              {/* Company Info Card */}
              <div className="bg-white dark:bg-zinc-900/50 rounded-4xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm font-sans">
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-6">About Company</h3>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-2xl font-bold text-zinc-400 border border-zinc-100 dark:border-zinc-700">
                    {job.company[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-zinc-900 dark:text-white">{job.company}</h4>
                    {job.companyWebsite && (
                      <Link href={job.companyWebsite} className="text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center gap-1 hover:underline">
                        <Globe className="h-3 w-3" />
                        Visit Website
                      </Link>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {job.companyEmployees && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-bold flex items-center gap-2">
                        <Users className="h-4 w-4" /> Size
                      </span>
                      <span className="text-zinc-900 dark:text-white font-extrabold">{job.companyEmployees}</span>
                    </div>
                  )}
                  {job.companyFounded && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-bold flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Founded
                      </span>
                      <span className="text-zinc-900 dark:text-white font-extrabold">{job.companyFounded}</span>
                    </div>
                  )}
                  {job.companyIndustry && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500 font-bold flex items-center gap-2">
                        <Briefcase className="h-4 w-4" /> Industry
                      </span>
                      <span className="text-zinc-900 dark:text-white font-extrabold">{job.companyIndustry}</span>
                    </div>
                  )}
                </div>

                <button className="w-full mt-8 py-4 px-6 bg-zinc-950 dark:bg-white text-white dark:text-black rounded-2xl font-extrabold text-sm hover:opacity-90 transition-opacity uppercase tracking-tight">
                  View Company Profile
                </button>
              </div>

              {/* Share Card */}
              <div className="bg-linear-to-br from-indigo-600 to-blue-700 rounded-4xl p-8 text-white shadow-xl shadow-blue-500/20">
                <h3 className="text-xl font-extrabold mb-4">{t("shareJob")}</h3>
                <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">
                  Know someone who would be a great fit? Let them know about this opportunity!
                </p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex items-center justify-center">
                    <Share2 className="h-6 w-6" />
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors flex items-center justify-center font-bold text-sm uppercase tracking-tight">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageWrapper>
  );
}
