"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { PageWrapper } from "@/components/PageWrapper";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Building2,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 1, title: "Basic Info", icon: Briefcase },
  { id: 2, title: "Location & Salary", icon: DollarSign },
  { id: 3, title: "Details", icon: FileText },
  { id: 4, title: "Preview", icon: CheckCircle2 },
];

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    category: "Engineering",
    location: "",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 pb-20">
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="relative flex items-center justify-between">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? "bg-blue-600 border-blue-600 text-white" 
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400"
                  }`}>
                    {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    currentStep >= step.id ? "text-blue-600" : "text-zinc-400"
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
              {/* Connector Lines */}
              <div className="absolute top-5 left-5 right-5 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-0">
                <motion.div 
                  className="h-full bg-blue-600"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <header>
                        <h2 className="text-2xl font-bold">First, let's get the basics</h2>
                        <p className="text-zinc-500 mt-1">What role are you hiring for?</p>
                      </header>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Job Title</label>
                          <input 
                            type="text" 
                            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            placeholder="e.g. Senior Frontend Engineer"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Job Category</label>
                            <select 
                              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                              <option>Engineering</option>
                              <option>Design</option>
                              <option>Marketing</option>
                              <option>Sales</option>
                              <option>Product</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Job Type</label>
                            <select 
                              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-blue-600 outline-none transition-all appearance-none"
                              value={formData.type}
                              onChange={(e) => setFormData({...formData, type: e.target.value})}
                            >
                              <option>Full-time</option>
                              <option>Part-time</option>
                              <option>Contract</option>
                              <option>Freelance</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location & Salary */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <header>
                        <h2 className="text-2xl font-bold">Location & Compensation</h2>
                        <p className="text-zinc-500 mt-1">Help candidates understand the setup.</p>
                      </header>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">Job Location</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                            <input 
                              type="text" 
                              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 pl-12 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                              placeholder="e.g. Remote or San Francisco, CA"
                              value={formData.location}
                              onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Minimum Salary (Annual)</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                              <input 
                                type="text" 
                                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 pl-8 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                placeholder="80,000"
                                value={formData.salaryMin}
                                onChange={(e) => setFormData({...formData, salaryMin: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Maximum Salary (Annual)</label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
                              <input 
                                type="text" 
                                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 pl-8 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                placeholder="120,000"
                                value={formData.salaryMax}
                                onChange={(e) => setFormData({...formData, salaryMax: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Details */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <header className="flex items-center justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">Job Description</h2>
                          <p className="text-zinc-500 mt-1">Provide as much detail as possible.</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg flex items-center gap-2 text-blue-600 text-xs font-bold">
                          <Sparkles className="h-3 w-3" />
                          AI Assist Available
                        </div>
                      </header>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold">The Role</label>
                          <textarea 
                            rows={8}
                            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-transparent focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                            placeholder="Write about the role, expectations, and day-to-day..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Preview */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <header>
                        <h2 className="text-2xl font-bold">Review & Publish</h2>
                        <p className="text-zinc-500 mt-1">Double check your information before going live.</p>
                      </header>
                      
                      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{formData.title || "Untitled Job"}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400">Your Company • {formData.location || "Location not set"}</p>
                          </div>
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            {formData.type}
                          </span>
                        </div>
                        <div className="flex gap-4 text-sm text-zinc-500 mb-6">
                          <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {formData.category}</span>
                          <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" /> ${formData.salaryMin} - ${formData.salaryMax}</span>
                        </div>
                        <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-4 text-zinc-600 dark:text-zinc-400">
                          {formData.description || "No description provided yet."}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-400 text-sm">
                        <CheckCircle2 className="h-5 w-5 flex-none" />
                        <p>Your job will be listed immediately and start receiving applications.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation */}
            <div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 disabled:opacity-0 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
                Back
              </button>

              {currentStep < 4 ? (
                <button 
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  Continue
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : (
                <button 
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  Publish Job Listing
                  <CheckCircle2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <aside className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Reach 10k+ candidates</h4>
                <p className="text-xs text-zinc-500 mt-1">Our platform is visited by top talent developers daily.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-purple-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AI Matching</h4>
                <p className="text-xs text-zinc-500 mt-1">We automatically highlight the best candidates for your role.</p>
              </div>
            </div>
          </aside>

        </main>
      </div>
    </PageWrapper>
  );
}

