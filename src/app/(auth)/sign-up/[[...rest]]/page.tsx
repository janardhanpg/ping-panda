"use client"
import { SignUp } from "@clerk/nextjs"
import React from "react"

export const runtime = "edge"

const Page = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp />
    </div>
  )
}

export default Page
