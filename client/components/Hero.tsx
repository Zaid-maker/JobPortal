"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Sparkles, TrendingUp, Users, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [displayText, setDisplayText] = useState("");
  
  // Typewriter effect logic
  useEffect(() => {
    // Get the localized text from the translation
    // We strip tags if needed, but here we just want the text content
    const fullText = t("typewriterWord") || "career potential";
    let i = 0;
    const speed = 100; // ms per character
    
    setDisplayText("");
    
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [t]);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/jobs?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/jobs");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 px-4 dark:bg-black sm:py-32 sm:px-6 lg:px-8">
      {/* Background Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
      <div className="absolute -bottom-8 right-0 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
      
      <div className="relative mx-auto max-w-7xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600 tracking-wide uppercase">{t("badge")}</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl md:text-7xl lg:leading-[1.1]"
          >
            {t.rich("title", {
              br: (chunks) => <br className="hidden sm:block" />,
              span1: (chunks) => (
                <span className="relative inline-block min-w-[280px] sm:min-w-[450px]">
                  <span className="relative z-10 text-blue-600">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-[3px] h-[0.8em] bg-blue-600 ml-1 translate-y-1"
                    />
                  </span>
                  <svg className="absolute -bottom-1 left-0 w-full h-[6px] text-blue-500/30 dark:text-blue-400/30 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="12" />
                  </svg>
                </span>
              )
            })}
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="mx-auto mt-8 max-w-2xl text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="mx-auto mt-12 max-w-4xl"
          >
            <div className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur-md p-3 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/80 sm:flex-row sm:items-center">
              <div className="flex flex-[1.2] items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800">
                <Search className="h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full border-none bg-transparent px-3 text-zinc-900 focus:outline-none focus:ring-0 dark:text-white placeholder:text-zinc-400"
                />
              </div>
              
              <div className="flex flex-1 items-center px-4 py-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  placeholder={t("location")}
                  className="w-full border-none bg-transparent px-3 text-zinc-900 focus:outline-none focus:ring-0 dark:text-white placeholder:text-zinc-400"
                />
              </div>

              <button 
                onClick={handleSearch}
                className="w-full rounded-xl bg-blue-600 px-10 py-4 font-bold text-white hover:bg-blue-700 sm:w-auto shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("btnSearch")}
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4" /> 500+ New Jobs</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 10k+ Candidates</span>
              <span className="flex items-center gap-1.5"><Building className="h-4 w-4" /> 2k+ Companies</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

