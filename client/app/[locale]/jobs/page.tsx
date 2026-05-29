"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Filter, Search, X, Loader2 } from "lucide-react";
import { Link } from "@/navigation";
import { PageWrapper } from "@/components/PageWrapper";
import { useSearchParams } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  category: string;
}

function JobsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs");
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(job.category);
      
      return matchesSearch && matchesType && matchesLevel;
    });
  }, [jobs, searchQuery, selectedTypes, selectedLevels]);

  const toggleType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedLevels([]);
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-64">
        <details className="lg:block group" open>
          <summary className="flex items-center justify-between cursor-pointer list-none lg:cursor-default lg:mb-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Filter className="h-5 w-5" />
              Filters
            </div>
            {(selectedTypes.length > 0 || selectedLevels.length > 0) && (
              <button 
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:underline font-medium lg:hidden"
              >
                Reset
              </button>
            )}
            <span className="lg:hidden text-blue-600 text-sm font-medium transition-transform group-open:rotate-180">
              ▼
            </span>
          </summary>

          <div className="space-y-6 pt-4 lg:pt-0">
            <div className="hidden lg:block">
              {(selectedTypes.length > 0 || selectedLevels.length > 0) && (
                <button 
                  onClick={resetFilters}
                  className="text-xs text-blue-600 hover:underline font-medium mb-4 block"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Job Type</h3>
              <div className="space-y-2">
                {["Full-time", "Part-time", "Contract", "Freelance"].map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-blue-600 transition-colors">
                    <input 
                      type="checkbox" 
                      className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" 
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Experience Level</h3>
              <div className="space-y-2">
                {["Entry Level", "Mid Level", "Senior Level", "Director"].map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-blue-600 transition-colors">
                    <input 
                      type="checkbox" 
                      className="rounded border-zinc-300 text-blue-600 focus:ring-blue-600" 
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </details>
      </aside>

      {/* Job Listings Area */}
      <div className="flex-1 space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search job titles or companies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" 
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">
          <p>Showing <span className="font-semibold text-zinc-900 dark:text-white">{filteredJobs.length}</span> results</p>
          {searchQuery && (
            <p>for "<span className="font-semibold text-zinc-700 dark:text-zinc-300">{searchQuery}</span>"</p>
          )}
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-4" />
              <p className="text-zinc-500 font-medium">Loading jobs...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/30 transition-all dark:bg-zinc-950 dark:border-zinc-800">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/jobs/${job.id}`} className="text-xl font-bold hover:text-blue-600 transition-colors block mb-1">
                      {job.title}
                    </Link>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">{job.company} • {job.location}</p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold dark:bg-blue-900/20 dark:text-blue-400">
                    {job.type}
                  </span>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-50 dark:border-zinc-900 pt-4">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{job.salary}</span>
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-blue-600 dark:bg-white dark:text-black dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
              <Search className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No jobs matched your search</h3>
              <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search terms to find what you're looking for.</p>
              <button 
                onClick={resetFilters}
                className="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobsPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-20">Loading jobs...</div>}>
            <JobsContent />
          </Suspense>
        </main>
      </div>
    </PageWrapper>
  );
}

