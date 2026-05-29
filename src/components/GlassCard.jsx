export default function GlassCard({ children, className = '', hover = false }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm md:p-6 ${
        hover
          ? 'transition-[colors,transform] hover:-translate-y-0.5 hover:border-white/15 motion-reduce:hover:translate-y-0'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
