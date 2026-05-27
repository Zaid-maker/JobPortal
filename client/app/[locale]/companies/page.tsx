import Navbar from "@/components/Navbar";
import { ExternalLink, Users } from "lucide-react";
import { PageWrapper } from "@/components/PageWrapper";

export default function CompaniesPage() {
  const dummyCompanies = [
    { name: "Google", industry: "Technology", employees: "100,000+", openJobs: 124 },
    { name: "Microsoft", industry: "Software", employees: "150,000+", openJobs: 89 },
    { name: "Airbnb", industry: "Hospitality", employees: "5,000+", openJobs: 15 },
    { name: "Stripe", industry: "Fintech", employees: "7,000+", openJobs: 42 },
    { name: "Notion", industry: "Software", employees: "500+", openJobs: 8 },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-3xl font-bold">Top Companies Hiring</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">Discover the best places to work and grow your career.</p>
          </header>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dummyCompanies.map((company) => (
              <div key={company.name} className="bg-white p-6 rounded-2xl border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 shadow-sm hover:border-blue-500/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center font-bold text-lg text-blue-600">
                    {company.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{company.name}</h3>
                    <p className="text-sm text-zinc-500">{company.industry}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 my-6">
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <Users className="h-4 w-4" />
                    {company.employees}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {company.openJobs} Open Jobs
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
                  View Profile
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}

