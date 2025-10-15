"use client"

const hero = () => {
  return (
    <div className="glass dark:glass-dark w-full h-[600px] relative overflow-hidden">
      <div className="absolute inset-0 shimmer-slow"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Hero</h1>
      </div>
    </div>
  )
}

export default hero
