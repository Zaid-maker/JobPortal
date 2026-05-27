import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoCloud from "@/components/LogoCloud";
import Stats from "@/components/Stats";
import FeaturedJobs from "@/components/FeaturedJobs";
import LatestJobs from "@/components/LatestJobs";
import Footer from "@/components/Footer";
import { PageWrapper } from "@/components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
        <Navbar />
        <main>
          <Hero />
          <LogoCloud />
          <Stats />
          <FeaturedJobs />
          <LatestJobs />
        </main>
        <Footer />
      </div>
    </PageWrapper>
  );
}
