"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    { label: t("activeJobs.label"), value: t("activeJobs.value"), description: t("activeJobs.description") },
    { label: t("companies.label"), value: t("companies.value"), description: t("companies.description") },
    { label: t("candidates.label"), value: t("candidates.value"), description: t("candidates.description") },
    { label: t("successRate.label"), value: t("successRate.value"), description: t("successRate.description") },
  ];

  return (
    <section className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-12 sm:p-20 rounded-[3rem] bg-zinc-900 border border-zinc-800 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight">
                  <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </div>
                <div className="text-lg font-bold text-zinc-100 mb-1">{stat.label}</div>
                <div className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
