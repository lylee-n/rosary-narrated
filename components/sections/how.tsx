"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useIsMobile } from "@/lib/hooks/use-mobile"

export function HowSection() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">How It Works</h2>
        <p className="text-gray-600 mb-8">A simple explanation of how our amazing service works.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 1: Sign Up</h3>
            <p className="text-gray-500">Create an account to get started. It's quick and easy!</p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 2: Choose a Plan</h3>
            <p className="text-gray-500">Select the plan that best suits your needs and budget.</p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 3: Enjoy!</h3>
            <p className="text-gray-500">Start using our service and experience the benefits.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
