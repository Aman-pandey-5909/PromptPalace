"use client"
// Seperate Logics, move from here to actual page.js, also make context to fetch posts initially when page loads
// move logout, delete account, change username, change password, share account features in a dropdown menu that opens when settings button is clicked
import React, { useContext, useEffect, useState } from "react";
import { GetUserContext } from "../../context/getUser";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import PostCard from "../feed/PostCard";
import MobileCard from "./MobileCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

/**
 * Dashboard + Mobile linking component
 * - Uses shadcn/ui primitives + Tailwind for polished layout
 * - Mobile number form appears inline in a nice card when needed
 * - Shows success / error banners and disables submit while waiting
 */



const Dashboard = ({ userPost, selfDashboard = false }) => {
  const { userData, setUserData } = useContext(GetUserContext);
  const [showMobileNo, setShowMobileNo] = useState(false);
  const router = useRouter();
  const onMobileLinked = (mobile) => {
    // update context gently
    setUserData && setUserData((prev) => ({ ...prev, mobile }));
    setShowMobileNo(false);
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_AUTH}/logout`, {}, { withCredentials: true })
      router.push("/auth/login")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background/60 via-background to-slate-50 py-12">
      {/* <Button onClick={logout}>Logout</Button> */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={userData?.avatar} alt={userData?.username || "User"} />
              <AvatarFallback className={cn("text-2xl font-semibold")}>{(userData?.username || "U").charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              {selfDashboard ? (<>
                <h1 className="text-2xl font-semibold">Welcome back{userData?.username ? `, ${userData.username}` : "user"}</h1>
                <p className="text-sm text-muted-foreground">Your dashboard — quick links and account details</p>
              </>
              ) : (
                <>
                  <h1 className="text-2xl font-semibold">{userData?.username}</h1>
                  <p className="text-sm text-muted-foreground">Dashboard for {userData?.username}</p>
                </>
              )
              }
            </div>
          </div>
          {selfDashboard && (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
                Refresh
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">Quick Settings</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem >Change Username</DropdownMenuItem>
                    <DropdownMenuItem >Change Password</DropdownMenuItem>
                    <DropdownMenuItem >Share Account</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>Account Settings</DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">Logout</DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will log you out of your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => logout()}>Logout</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">Delete</DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure you want to Delete your account?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <Card className="p-6 gap-2">
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
                  {selfDashboard && (

                    <div>
                      {userData?.mobile ? (
                        <Button size="sm" variant="outline" onClick={() => alert("Unlink flow")}>Unlink</Button>
                      ) : (
                        <Button size="sm" onClick={() => setShowMobileNo((s) => !s)}>Link mobile</Button>
                      )}
                    </div>
                  )}
                </div>

                {selfDashboard && (

                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Quick actions</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={() => router.push("/dashboard/write")}>Create Prompt</Button>
                      <Button size="sm" variant="ghost" onClick={() => router.push("/feed")}>Go to Feed</Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* make the mobile card into dialog from shadcn ui */}
            {showMobileNo && <MobileCard onSuccess={onMobileLinked} />}

          </div>

          <aside>
            <Card className="p-4 gap-1">
              <h3 className="font-medium mb-2">Stats</h3>
              <div className="flex flex-col gap-0">
                <div className="text-sm text-muted-foreground">Prompts created</div>
                <div className="text-2xl font-semibold">{userPost.length ?? 0}</div>

                <div className="mt-4 text-sm text-muted-foreground">Reputation</div>
                <div className="text-2xl font-semibold">{Math.floor(userPost.length / 10) ?? 12}</div>
              </div>
            </Card>

            {selfDashboard && (

              <Card className="p-4 mt-4 gap-1">
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
            )}
          </aside>
        </div>
      </div>
      <div>
        {userPost.length > 0 ? (
          <Card className={"max-w-4xl mx-auto gap-0 p-0 my-5 max-h-[80vh] overflow-auto"}>
            <CardHeader className="text-xl font-medium py-1 px-4 flex justify-center-safe items-center-safe">
              {selfDashboard ? "Your posts" : `${userData?.username}'s posts`}
            </CardHeader>
            <div className="px-4 border-t-2 gap-2 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-h-[80vh] overflow-auto">
              {userPost?.map(post => <PostCard key={post._id} post={post} />)}
            </div>
          </Card>) : (
          <Card className={"max-w-4xl mx-auto gap-0 px-4 text-xl my-5 max-h-[80vh] overflow-auto"}>
            <div>Seems like you have not created any posts yet!&nbsp;
              <Button className={"p-0 text-xl underline"} variant={"ghost"} onClick={() => router.push("/dashboard/write")}>Create Posts</Button>
            </div>
          </Card>
        )
        }
      </div>
    </div>
  );
};

export default Dashboard;