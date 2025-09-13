'use client'
import Dashboard from "@/components/dashboard/Dashboard"
import React, { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { GetUserContext } from "@/context/getUser";


const DashboardPage = () => {
  const { userData, setUserData } = useContext(GetUserContext);
  console.log("Dashboard Page", userData);
  const [userPost, setUserPost] = useState([
    
  ]);
  const router = useRouter();

  useEffect(() => {
    if (!userData?._id) {
      return
    }
    async function getPost() {
      try {
        console.log("post id", userData._id);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/userposts?id=${userData._id}`, { withCredentials: true })
        // console.log("post", res.data.data);
        setUserPost(res.data.data)
      } catch (error) {
        setUserPost([])
      }
    }
    getPost();
  }, [userData?._id]);

  const logout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_AUTH}/logout`, {}, { withCredentials: true })
      router.push("/auth/login")
    } catch (error) {
      console.error(error);
    }
  }

  const onMobileLinked = (mobile) => {
    // update context gently
    setUserData && setUserData((prev) => ({ ...prev, mobile }));
    setShowMobileNo(false);
  };

  return (
    <React.Fragment>
      <Dashboard userPost={userPost} selfDashboard={true} logout={logout} onMobileLinked={onMobileLinked} userData={userData} />
    </React.Fragment>
  )
}
export default DashboardPage