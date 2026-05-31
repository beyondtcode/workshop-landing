export default function GlassCard({ children, className = '', hover = false }) {
  return (
    <div
      className={`card-glow rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur-md md:p-7 ${
        hover
          ? 'card-glow-hover transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/20 motion-reduce:hover:translate-y-0'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
