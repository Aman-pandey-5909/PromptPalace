'use client'
import { checkRouteRestriction } from "@/utils/checkRouteRestriction";
import { createContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"

export const CheckSessionContext = createContext();

const CheckSession = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const excludedRoutes = ['/auth/login', '/auth/signup']
    useEffect(() => {
        async function checkRoute() {
            // if (excludedRoutes.includes(pathname)) {
            //     setLoading(false)
            //     return
            // }
            console.log("check route function inside"); //reached
            const res = await checkRouteRestriction() // reaches but gets stuck here after user is logged in and then reloads the page
            console.log("res", res); // unreachable once logged in
            if (!res) { // unreachable once logged in
                console.log("session checked | false");
                if(excludedRoutes.includes(pathname)) {
                    setLoading(false)
                    return
                }
                router.push('/auth/login')
                return
            } else {
                console.log("session checked | true");
                if (excludedRoutes.includes(pathname)) {
                    router.push('/')
                }
                setLoading(false)
                return
            }
        }
        checkRoute() //reached
        console.log("check route function end"); //reached
    }, [pathname])

    return (
        <CheckSessionContext.Provider value={{ loading }}>
            {loading ? <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div> : children}
        </CheckSessionContext.Provider>
    )
}
export default CheckSession

