"use client"

import React, { useContext, useState } from "react";
import { GetUserContext } from "../../context/getUser";
import { useForm } from "react-hook-form";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Phone, User, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

/**
 * Dashboard + Mobile linking component
 * - Uses shadcn/ui primitives + Tailwind for polished layout
 * - Mobile number form appears inline in a nice card when needed
 * - Shows success / error banners and disables submit while waiting
 */

const MobileCard = ({ onSuccess }) => {
  const form = useForm({
    defaultValues: {
      mobileno: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("info");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_LINK}/updatedetails`,
        data,
        { withCredentials: true }
      );

      setVariant("success");
      setMessage("Mobile number linked successfully.");
      onSuccess && onSuccess(data.mobileno);
      // keep message visible a bit
    } catch (error) {
      // console.error(error);
      setVariant("danger");
      setMessage(
        error?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-4 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          Link Mobile Number
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Add your phone to secure your account and enable 2FA / SMS features.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            <FormField
              control={form.control}
              name="mobileno"
              rules={{
                required: "Mobile number is required",
                minLength: { value: 10, message: "Enter a valid number" },
              }}
              render={({ field }) => (  
                <FormItem>
                  <FormLabel className="text-sm font-medium">Mobile</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-sm">+91</span>
                      <Input
                        type="tel"
                        placeholder="90000 00000"
                        {...field}
                        className="rounded-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {message && (
              <div
                className={cn(
                  "mt-4 px-4 py-2 rounded-md text-sm",
                  variant === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                )}
              >
                {message}
              </div>
            )}

            <CardFooter className="mt-4 p-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Linking..." : "Link Number"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const { userData, setUserData } = useContext(GetUserContext);
  const [showMobileNo, setShowMobileNo] = useState(false);
  const router = useRouter();

  const onMobileLinked = (mobile) => {
    // update context gently
    setUserData && setUserData((prev) => ({ ...prev, mobile }));
    setShowMobileNo(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/60 via-background to-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={userData?.avatar} alt={userData?.username || "User"} />
              <AvatarFallback className={cn("text-2xl font-semibold")}>{(userData?.username || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">Welcome back{userData?.username ? `, ${userData.username}` : "user"}</h1>
              <p className="text-sm text-muted-foreground">Your dashboard — quick links and account details</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
              Refresh
            </Button>
            <Button size="sm" onClick={() => alert("Open settings modal (implement)")}>Settings</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-2">Account</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Username</p>
                    <p className="font-medium">{userData?.username || "No username"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{userData?.email || "No email"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Mobile</p>
                    <p className="font-medium">{userData?.mobile || "Not linked"}</p>
                  </div>
                  <div>
                    {userData?.mobile ? (
                      <Button size="sm" variant="outline" onClick={() => alert("Unlink flow")}>Unlink</Button>
                    ) : (
                      <Button size="sm" onClick={() => setShowMobileNo((s) => !s)}>Link mobile</Button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Quick actions</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" onClick={() => router.push("/dashboard/write")}>Create Prompt</Button>
                    <Button size="sm" variant="ghost" onClick={() => alert("Go to feed (TODO)")}>Go to Feed</Button>
                  </div>
                </div>
              </div>
            </Card>

            {showMobileNo && <MobileCard onSuccess={onMobileLinked} />}
          </div>

          <aside>
            <Card className="p-4">
              <h3 className="font-medium mb-2">Stats</h3>
              <div className="flex flex-col gap-3">
                <div className="text-sm text-muted-foreground">Prompts created</div>
                <div className="text-2xl font-semibold">{userData?.promptsCount ?? 0}</div>

                <div className="mt-4 text-sm text-muted-foreground">Reputation</div>
                <div className="text-2xl font-semibold">{userData?.reputation ?? 12}</div>
              </div>
            </Card>

            <Card className="p-4 mt-4">
              <h3 className="font-medium mb-2">Helpful links</h3>
              <ul className="flex flex-col gap-2 text-sm">
                <li>
                  <a className="underline" href="/docs">Docs</a>
                </li>
                <li>
                  <a className="underline" href="/settings">Account settings</a>
                </li>
                <li>
                  <a className="underline" href="/support">Report issue</a>
                </li>
              </ul>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;