"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Menu, PlusCircle, X } from "lucide-react";
import { Link } from "@/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md dark:bg-black/80 shadow-sm py-2 border-zinc-200 dark:border-zinc-800" 
          : "bg-white dark:bg-black py-4 border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <BriefcaseBusiness className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Job<span className="text-blue-600">Portal</span>
              </span>
            </Link>
            
            <div className="hidden md:flex md:gap-1">
              {[
                { name: t("findJobs"), href: "/jobs" },
                { name: t("companies"), href: "/companies" },
                { name: t("dashboard"), href: "/dashboard" },
                { name: t("employers"), href: "/employer" },
              ].map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            <Link 
              href="/post-job" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              {t("postAJob")}
            </Link>
            
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2" />
            
            <LanguageSwitcher />
            <ThemeToggle />
            
            <Link 
              href="/login" 
              className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400"
            >
              {t("logIn")}
            </Link>
            <Link 
              href="/signup" 
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("signUp")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="flex flex-col gap-1">
                {[
                  { name: t("findJobs"), href: "/jobs" },
                  { name: t("companies"), href: "/companies" },
                  { name: t("dashboard"), href: "/dashboard" },
                  { name: t("employers"), href: "/employer" },
                  { name: t("postAJob"), href: "/post-job", icon: PlusCircle },
                ].map((link) => (
                  <Link 
                    key={link.name}
                    href={link.href} 
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.name}
                  </Link>
                ))}
              </div>
              
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/login" 
                    className="flex justify-center px-4 py-3 text-base font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 rounded-xl border border-zinc-200 dark:border-zinc-800"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("logIn")}
                  </Link>
                  <Link 
                    href="/signup" 
                    className="flex justify-center rounded-xl bg-blue-600 px-4 py-3 text-base font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("signUp")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
