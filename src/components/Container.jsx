export default function Container({ children, className = '' }) {
  return (
    <div
      className={`mx-auto w-full max-w-full px-5 sm:px-6 md:max-w-2xl lg:max-w-[780px] ${className}`}
    >
      {children}
    </div>
  )
}
