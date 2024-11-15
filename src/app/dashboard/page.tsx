import DashboardPage from "@/components/DashboardPage"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import React from "react"
import DashboardPageContent from "./dashboard-page-content"
import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"
import PaymentSuccessModal from "@/components/PaymentSuccessModal"
interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}
export const runtime = "edge"

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in")
  }
  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })
  if (!user) {
    redirect("/sign-in")
  }
  const searchContent = await searchParams
  const intent = searchContent.intent

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })
    if (session.url) redirect(session.url)
  }
  const success = searchContent.success
  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" /> Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}

export default Page
