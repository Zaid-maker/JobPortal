import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth/auth";
import jobs from "./routes/jobs";
import applications from "./routes/applications";

const app = new Hono();

// Middleware
app.use("*", cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    maxAge: 600,
    credentials: true,
}));

// Auth Route (Better Auth handles login/signup/session logic here)
app.on(["POST", "GET"], "/api/auth/**", (c) => {
    return auth.handler(c.req.raw);
});

// Jobs Routes
app.route("/api/jobs", jobs);

// Applications Routes
app.route("/api/applications", applications);

// Health check
app.get("/", (c) => {
    return c.text("JobPortal API is running!");
});

export default {
    port: 3001,
    fetch: app.fetch,
};
