export function LoadingScreen() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="glass w-full max-w-lg rounded-3xl p-8 text-center">
        <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple p-[1px]">
          <div className="h-full w-full rounded-2xl bg-background/90" />
        </div>
        <div className="mt-6 h-4 w-40 animate-pulse rounded-full bg-secondary mx-auto" />
        <div className="mt-3 h-3 w-64 animate-pulse rounded-full bg-secondary/80 mx-auto" />
        <div className="mt-8 space-y-3">
          <div className="h-3 animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-5/6 animate-pulse rounded-full bg-secondary/70" />
          <div className="h-3 w-4/6 animate-pulse rounded-full bg-secondary/70" />
        </div>
      </div>
    </div>
  )
}