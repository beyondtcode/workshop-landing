const variants = {
  primary:
    'bg-purple-deep text-white shadow-[0_0_24px_rgba(167,139,250,0.25)] hover:bg-[#6d28d9]',
  submit:
    'w-full bg-gradient-to-l from-purple-deep to-[#5b21b6] text-white shadow-[0_0_24px_rgba(167,139,250,0.25)] hover:from-[#6d28d9] hover:to-purple-deep',
}

export default function GlowButton({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl px-6 py-3.5 text-base font-semibold transition-[colors,transform] hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
