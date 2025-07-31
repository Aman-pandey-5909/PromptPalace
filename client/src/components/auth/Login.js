"use client"

import { useForm } from "react-hook-form"
import { ToastContainer, toast, Bounce } from "react-toastify"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [errorMessage, setErrorMessage] = useState()
  const router = useRouter()
  const onSubmit = async(data) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_AUTH}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      console.log(data)
      if (res.status === 200) {
        toast("✅ Login succesfull", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
        router.push("/")
      }
    } catch (error) {
      console.log(error)
      toast(`❌ ${error.response.data.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <Card className="w-full max-w-sm">
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="m@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <p className="text-destructive">*{errorMessage}</p>}
          </CardContent>

          <CardFooter className="flex-col mt-2 gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full" type="button">
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

export default Login
