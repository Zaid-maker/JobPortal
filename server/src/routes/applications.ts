import { Hono } from "hono";
import prisma from "../db/prisma";
import { auth } from "../auth/auth";

const applications = new Hono();

// Get applications for the logged-in user
applications.get("/me", async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const userApplications = await prisma.application.findMany({
        where: { userId: session.user.id },
        include: {
            job: true
        },
        orderBy: { createdAt: "desc" }
    });

    return c.json(userApplications);
});

// Apply for a job
applications.post("/apply", async (c) => {
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if (!session) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    const { jobId, resume, coverLetter } = await c.req.json();

    if (!jobId) {
        return c.json({ error: "Job ID is required" }, 400);
    }

    try {
        const application = await prisma.application.create({
            data: {
                jobId,
                userId: session.user.id,
                resume,
                coverLetter,
                status: "PENDING"
            }
        });

        return c.json(application, 201);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return c.json({ error: "You have already applied for this job" }, 400);
        }
        return c.json({ error: "Failed to apply" }, 500);
    }
});

export default applications;
