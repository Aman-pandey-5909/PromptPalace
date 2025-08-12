"use client"

// implement toast and error feild for server recieved error later :) (just use toastify and a useState for error)
import { useForm } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"

const Signup = () => {
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            setPasswordMismatch(true)
            return
        }
        setPasswordMismatch(false)
        console.log("Signup Data:", data)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_AUTH}/register`, data, {
            withCredentials: true
        })
        console.log(res);
        if (res.status === 200) {
            router.push("/auth/login")
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create a new account
                </CardDescription>
                <CardAction>
                    <Button variant="link" asChild>
                        <Link href="/auth/login">Login</Link>
                    </Button>
                </CardAction>
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            rules={{ required: "Username is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="yourusername" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            rules={{ required: "Please confirm your password" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    {passwordMismatch && (
                                        <p className="text-sm font-medium text-red-500">
                                            Passwords do not match
                                        </p>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex-col mt-2 gap-2">
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                        <Button variant="outline" type="button" className="w-full">
                            Sign up with Google
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}

export default Signup
