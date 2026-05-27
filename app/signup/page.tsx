import Link from "next/link";
import { BriefcaseBusiness, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";

export default function SignupPage() {
  return (
    <PageWrapper>
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black sm:px-6 lg:px-8">
        <div className="w-full max-w-xl space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <BriefcaseBusiness className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                JobPortal
              </span>
            </Link>
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Join thousands of professionals and start your journey
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm dark:bg-zinc-950 dark:border-zinc-800">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-zinc-200 bg-transparent py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800"
                    />
                  </div>
                </div>
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
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">I want to...</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <input type="radio" name="role" className="peer sr-only" defaultChecked />
                    <div className="text-center peer-checked:text-blue-600">
                      <span className="block font-bold">Find a Job</span>
                    </div>
                  </label>
                  <label className="relative flex cursor-pointer items-center justify-center rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                    <input type="radio" name="role" className="peer sr-only" />
                    <div className="text-center peer-checked:text-blue-600">
                      <span className="block font-bold">Post a Job</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-zinc-200 bg-transparent py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-600 dark:border-zinc-800"
                  />
                </div>
                <p className="text-xs text-zinc-500">Minimum 8 characters with at least one symbol</p>
              </div>

              <button className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                Get Started
              </button>
            </form>

            <div className="mt-8 text-center border-t border-zinc-100 pt-6 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
