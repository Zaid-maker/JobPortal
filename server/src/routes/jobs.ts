import { Hono } from "hono";
import prisma from "../db/prisma";
import { auth } from "../auth/auth";

const jobs = new Hono();

// Get all jobs
jobs.get("/", async (c) => {
    const allJobs = await prisma.job.findMany({
        orderBy: { createdAt: "desc" }
    });
    return c.json(allJobs);
});

// Get single job
jobs.get("/:id", async (c) => {
    const id = c.req.param("id");
    const job = await prisma.job.findUnique({
        where: { id }
    });
    if (!job) return c.json({ error: "Job not found" }, 404);
    return c.json(job);
});

// Create job (Protected - Employer only)
jobs.post("/", async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session || session.user.role !== "EMPLOYER") {
        return c.json({ error: "Unauthorized. Employer role required." }, 401);
    }

    const { 
        title, company, location, type, salary, category, 
        description, responsibilities, requirements, benefits 
    } = await c.req.json();
    
    const job = await prisma.job.create({
        data: {
            title,
            company,
            location,
            type,
            salary,
            category,
            description,
            responsibilities: responsibilities || [],
            requirements: requirements || [],
            benefits: benefits || [],
            postedById: session.user.id
        }
    });

    return c.json(job, 201);
});

export default jobs;
