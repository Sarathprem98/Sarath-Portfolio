export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="mesh-gradient absolute inset-0 opacity-90" />
      <div className="absolute -top-44 -left-36 size-[38rem] rounded-full bg-brand-blue/20 blur-[140px] motion-safe:animate-[float_18s_ease-in-out_infinite]" />
      <div className="absolute top-1/4 -right-36 size-[34rem] rounded-full bg-brand-purple/20 blur-[150px] motion-safe:animate-[float_22s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-1/3 size-[28rem] rounded-full bg-brand-blue/10 blur-[130px] motion-safe:animate-[float_24s_ease-in-out_infinite]" />
      <div
        className="section-grid absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />
    </div>
  )
}
