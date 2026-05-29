export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-full px-5 md:max-w-xl lg:max-w-[720px] ${className}`}
    >
      {children}
    </div>
  )
}
