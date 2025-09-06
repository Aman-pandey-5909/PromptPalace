'use client'
import Dashboard from "@/components/dashboard/Dashboard"
import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { GetUserContext } from "@/context/getUser";


const DashboardPage = () => {
  const { userData, setUserData } = useContext(GetUserContext);
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    async function getPost() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/userposts`, { withCredentials: true })
        // console.log("post", res.data.data);
        setUserPost(res.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getPost();
  }, []);
  return (
    <React.Fragment>
      <Dashboard userPost={userPost} selfDashboard={true}/>
    </React.Fragment>
  )
}
export default DashboardPage