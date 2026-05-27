import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create a default employer if it doesn't exist
  // Note: Better Auth manages users, but we need a user ID for postedById
  // In a real scenario, you'd want to use a real user ID.
  // For seeding, we'll just create a dummy "system" user if needed, 
  // but Better Auth tables are managed by Better Auth.
  
  // Let's check if there are any users first.
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log("No users found. Please sign up an account first to seed jobs correctly.");
    return;
  }

  const userId = users[0].id;

  const jobs = [
    {
      title: "Senior Frontend Engineer",
      company: "TechFlow",
      location: "Remote",
      salary: "$130k - $170k",
      type: "Full-time",
      category: "Senior Level",
      description: "We are looking for a Senior Frontend Engineer proficient in React and Next.js.",
      responsibilities: ["Develop new user-facing features", "Build reusable components", "Optimize applications for speed"],
      requirements: ["5+ years of experience with React", "Strong understanding of TypeScript", "Experience with Tailwind CSS"],
      benefits: ["Health insurance", "Remote work", "Generous PTO"],
      companyWebsite: "https://techflow.io",
      postedById: userId,
    },
    {
      title: "Full Stack Developer",
      company: "CloudScale",
      location: "New York, NY",
      salary: "$140k - $190k",
      type: "Full-time",
      category: "Mid Level",
      description: "Join our team to build scalable cloud solutions.",
      responsibilities: ["Design and implement APIs", "Work on both frontend and backend", "Monitor system performance"],
      requirements: ["Experience with Node.js and Hono", "Proficiency in React", "Knowledge of PostgreSQL"],
      benefits: ["Stock options", "Flexible hours", "Learning budget"],
      companyWebsite: "https://cloudscale.com",
      postedById: userId,
    },
    {
      title: "UI Designer",
      company: "Creative Studio",
      location: "London, UK",
      salary: "£60k - £80k",
      type: "Contract",
      category: "Mid Level",
      description: "Help us design beautiful and intuitive user interfaces.",
      responsibilities: ["Create wireframes and prototypes", "Collaborate with developers", "Conduct user research"],
      requirements: ["Experience with Figma", "Strong portfolio", "Understanding of UX principles"],
      benefits: ["Remote friendly", "Creative freedom", "Exciting projects"],
      companyWebsite: "https://creativestudio.design",
      postedById: userId,
    },
    {
      title: "Backend Engineer",
      company: "DataStream",
      location: "San Francisco, CA",
      salary: "$150k - $200k",
      type: "Full-time",
      category: "Senior Level",
      description: "Build high-performance data processing pipelines.",
      responsibilities: ["Develop distributed systems", "Optimize database queries", "Implement security protocols"],
      requirements: ["Go or Rust experience", "Kubernetes knowledge", "PostgreSQL expertise"],
      benefits: ["Unlimited PTO", "Health insurance", "Gym membership"],
      postedById: userId,
    },
    {
      title: "Junior Web Developer",
      company: "StartUp Inc",
      location: "Austin, TX",
      salary: "$70k - $90k",
      type: "Full-time",
      category: "Entry Level",
      description: "Start your career with a fast-growing tech startup.",
      responsibilities: ["Maintain existing websites", "Fix bugs", "Learn new technologies"],
      requirements: ["HTML/CSS/JS knowledge", "Basic React", "Willingness to learn"],
      benefits: ["Mentorship", "Casual dress code", "Free snacks"],
      postedById: userId,
    },
    {
      title: "Product Manager",
      company: "ScaleUp",
      location: "Berlin, Germany",
      salary: "€80k - €110k",
      type: "Full-time",
      category: "Mid Level",
      description: "Lead product development cycles from conception to launch.",
      responsibilities: ["Define product roadmap", "Write user stories", "Analyze market trends"],
      requirements: ["3+ years PM experience", "Agile methodology", "Strong communication"],
      benefits: ["Visa sponsorship", "Hybrid work", "Language courses"],
      postedById: userId,
    }
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: job
    });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
