export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary/30 rounded-full animate-spin animation-delay-75"></div>
      </div>
    </div>
  )
}