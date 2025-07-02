"use client"

export function BlogsSection() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">Blogs</h1>
        <p className="text-xl text-muted-foreground">Coming Soon</p>
        <p className="text-sm text-muted-foreground max-w-md">
          We're working on bringing you inspiring articles and insights about prayer, faith, and the Rosary.
        </p>
      </div>
    </section>
  )
}
