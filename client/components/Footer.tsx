"use client";

import { Link } from "@/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { 
  Building2, 
  Mail, 
  ArrowUpRight 
} from "lucide-react";
import { 
  FaXTwitter, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram 
} from "react-icons/fa6";

export default function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = {
    product: [
      { name: t("product.findJobs"), href: "/jobs" },
      { name: t("product.companies"), href: "/companies" },
      { name: t("product.postJob"), href: "/post-job" },
      { name: t("product.pricing"), href: "/pricing" },
    ],
    company: [
      { name: t("company.aboutUs"), href: "/about" },
      { name: t("company.careers"), href: "/careers" },
      { name: t("company.blog"), href: "/blog" },
      { name: t("company.contact"), href: "/contact" },
    ],
    legal: [
      { name: t("legal.privacy"), href: "/privacy" },
      { name: t("legal.terms"), href: "/terms" },
      { name: t("legal.cookie"), href: "/cookies" },
      { name: t("legal.security"), href: "/security" },
    ]
  };

  const socialLinks = [
    { icon: FaXTwitter, href: "#", name: "Twitter" },
    { icon: FaLinkedinIn, href: "#", name: "LinkedIn" },
    { icon: FaGithub, href: "#", name: "GitHub" },
    { icon: FaInstagram, href: "#", name: "Instagram" },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase">
                Job<span className="text-blue-600">Portal</span>
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs font-medium">
              {t("brandDescription")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-blue-600 hover:border-blue-500/30 transition-all group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key} className="space-y-6">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                {t(`titles.${key}`)}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Bottom Bar */}
        <div className="pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
              <Mail className="h-4 w-4" />
              hello@jobportal.io
            </div>
            <div className="hidden sm:block h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <p className="text-sm text-zinc-500 font-medium">
              {t("copyright")}
            </p>
          </div>
          
          <div className="flex gap-8">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
