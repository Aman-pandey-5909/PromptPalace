'use client'

import { createContext, useEffect, useState } from "react"
import axios from "axios";
import { usePathname } from "next/navigation";

export const GetUserContext = createContext();

// instead of running once on every path change, make it so that it runs intially once, and then goes into sleep for a time frame (3-4min) and then become savailable, and any action(scroll, click, path change, etc) in frotnend runs it again, to stay updated

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