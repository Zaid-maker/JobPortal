"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
];

export default function LogoCloud() {
  const t = useTranslations("LogoCloud");

  return (
    <section className="py-12 bg-white dark:bg-black overflow-hidden border-y border-zinc-100 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-8">
          {t("title")}
        </p>
        
        <div className="relative">
          {/* Gradients for smooth fade out at edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

          <div className="flex overflow-hidden">
            <motion.div 
              className="flex gap-16 items-center whitespace-nowrap"
              animate={{
                x: [0, -1035],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...companies, ...companies].map((company, index) => (
                <div key={index} className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                   <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-8 w-auto dark:invert" 
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
