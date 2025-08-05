'use client'
import { useContext } from "react"
import { GetUserContext } from "../../context/getUser"

const getMobileNo = () => {
  return (
    <div>
      Hello
    </div>
  )
}

const Dashboard = () => {
  const {userData, setUserData} = useContext(GetUserContext)
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <button onClick={onClick}>Fetch details</button> */}
      <div>
        <h2>Username: {userData.username || "No username"}</h2>
        <h2>Email: {userData.email || "No email"}</h2>
        <button className="border">Link Mobile Number</button>
      </div>
    </div>
  )
}
export default Dashboard 