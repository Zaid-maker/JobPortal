<!-- BEGIN:nextjs-agent-rules -->
# Next.js Expert Instructions

This project runs on Next.js 16.2.6 (App Router) which contains breaking changes. Follow these steps strictly before any implementation:

- **Documentation**: If the `node_modules/next/dist/docs/` directory does not exist, run `bun install` using the terminal first. Once present, read the directory contents of `node_modules/next/dist/docs/` using a file search tool, identify the specific markdown file matching the user's task, and read that file's contents.
- **Server Components**: All components in the `app/` directory are Server Components by default. Fetch data directly in these components using `await`.
- **Client-Side Logic**: Only use `"use client"` at the top of files that require React hooks (`useState`, `useEffect`) or DOM event listeners. Keep these components as leaf nodes.
- **Metadata**: Define metadata using the `generateMetadata` function or `Metadata` object in `layout.tsx` or `page.tsx`.
- **Caching**: Understand that `fetch` requests are cached by default unless configured otherwise.

Heed all deprecation notices in logs and documentation.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:rules -->
## Workspace Standards

- **Runtime**: Bun is the required runtime and package manager. Use `bun run dev` for development and `bun install` for dependency management. NEVER use `npm`, `yarn`, or `pnpm`.
- **TypeScript**: Use strict TypeScript. Define interfaces for all props and data structures.
- **Linting**: Run `bun run lint` to check for code style issues.
- **CSS**: Use Tailwind CSS 4 utility classes. Avoid custom CSS unless absolutely necessary.
<!-- END:rules -->