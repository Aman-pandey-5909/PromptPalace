'use client'

import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { usePathname } from "next/navigation";

export const GetUserContext = createContext();

export default function GetUser ({children}) {
    const [userData, setUserData] = useState({});
    const pathname = usePathname()
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_LINK}/details`, { withCredentials: true })
                setUserData(res.data.data)
                console.log(res.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [pathname])

    return (
        <GetUserContext.Provider value={{userData, setUserData}}>
            {children}
        </GetUserContext.Provider>
    )

}