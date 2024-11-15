"use client"
import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"
import React from "react"

export const runtime = "edge"

const Page = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}

export default Page
