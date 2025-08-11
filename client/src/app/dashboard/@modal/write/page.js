"use client"
import WritePost from "@/components/dashboard/WritePost"
import { useRouter } from "next/navigation"

const page = () => {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <WritePost />
      <button onClick={() => router.back()}>Back</button>
    </div>
  )
}
export default page