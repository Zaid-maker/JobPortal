export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-blue-600 dark:border-zinc-800"></div>
        <p className="text-sm font-medium text-zinc-500 animate-pulse">Loading JobPortal...</p>
      </div>
    </div>
  );
}
