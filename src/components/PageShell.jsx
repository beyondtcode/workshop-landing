export default function PageShell({ children }) {
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-bg text-right rtl">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(124,58,237,0.22),transparent),linear-gradient(to_bottom,#120a1f_0%,var(--color-bg)_45%)]"
        aria-hidden
      />
      <div
        className="hero-orb pointer-events-none absolute top-0 left-1/2 h-[480px] w-[480px] rounded-full bg-purple-deep/25 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[35%] right-0 h-[280px] w-[280px] rounded-full bg-neon/5 blur-[80px]"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
