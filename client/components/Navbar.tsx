"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Link, useRouter } from "@/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { useSession, signOut } from "@/lib/auth-client";
import { 
  BriefcaseBusiness, 
  Menu, 
  PlusCircle, 
  X, 
  LogOut, 
  User as UserIcon,
  LayoutDashboard, 
  Settings, 
  ChevronDown 
} from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

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
            
            {!session ? (
              <>
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
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="group flex items-center gap-2 p-1.5 pr-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all active:scale-95"
                >
                  <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm">
                    {session.user.image ? (
                        <img src={session.user.image} alt="" className="h-full w-full rounded-lg object-cover" />
                    ) : (
                        session.user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white leading-none mb-0.5">
                        {session.user.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider leading-none">
                        {(session.user as any).role || 'User'}
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsProfileOpen(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xl z-20 overflow-hidden"
                      >
                        <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
                          <p className="text-sm font-bold text-zinc-900 dark:text-white">{session.user.name}</p>
                          <p className="text-xs text-zinc-500 font-medium truncate">{session.user.email}</p>
                        </div>
                        
                        <div className="p-1.5">
                            {[
                                { name: "Profile", href: "/profile", icon: UserIcon },
                                { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
                                { name: "Settings", href: "/settings", icon: Settings },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-colors"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                            
                            <div className="my-1.5 h-px bg-zinc-100 dark:bg-zinc-800" />
                            
                            <button
                                onClick={handleSignOut}
                                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-black overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
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
              
              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800">
                {!session ? (
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
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-base shadow-sm">
                        {session.user.image ? (
                            <img src={session.user.image} alt="" className="h-full w-full rounded-xl object-cover" />
                        ) : (
                            session.user.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white leading-none mb-1">{session.user.name}</p>
                        <p className="text-xs text-zinc-500 font-medium">{session.user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      {[
                        { name: "Profile", href: "/profile", icon: UserIcon },
                        { name: "Settings", href: "/settings", icon: Settings },
                      ].map((link) => (
                        <Link 
                          key={link.href}
                          href={link.href} 
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <link.icon className="h-5 w-5" />
                          {link.name}
                        </Link>
                      ))}
                      <button 
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

