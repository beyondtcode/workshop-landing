export default function PageShell({ children }) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-right rtl">
      <div
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#0f0818] to-bg"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute top-0 left-1/2 h-[420px] w-[420px] rounded-full bg-purple-deep/20 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
