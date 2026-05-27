import Link from "next/link";
import { BriefcaseBusiness, Mail, Lock, ArrowRight } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";

export default function LoginPage() {
  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <BriefcaseBusiness className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                JobPortal
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Log in to your account to continue
            </p>
          </div>

          <div className="mt-8 bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-zinc-200 bg-transparent py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold">Password</label>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-200 bg-transparent py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800"
                  />
                </div>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                Log in
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 text-center border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
