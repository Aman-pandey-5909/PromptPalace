"use client"
import WritePost from "@/components/dashboard/WritePost"
import { useRouter } from "next/navigation"
import axios from "axios"

const Write = () => {
  const router = useRouter()
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK}/postprompt`, data, { withCredentials: true })
      console.log(res)
      router.back()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
      <WritePost onSubmit={onSubmit} />
      <button onClick={() => router.back()}>Back</button>
    </div>
  )
}
export default Write