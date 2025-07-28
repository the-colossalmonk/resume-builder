import { Suspense } from "react"

function BuilderLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Resume Builder...</p>
      </div>
    </div>
  )
}

export default function BuilderLayout({ children }) {
  return <Suspense fallback={<BuilderLoading />}>{children}</Suspense>
}
