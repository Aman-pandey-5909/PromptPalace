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
        if (excludedRoutes.includes(pathname)) {
            setLoading(false)
            return
        }
        async function checkRoute() {
            console.log("session checked");
            const res = await checkRouteRestriction()
            if (res.redirect) {
                router.push(res.redirect.destination)
            } else {
                setLoading(false)
            }
        }
        checkRoute()
    }, [pathname])

    return (
        <CheckSessionContext.Provider value={{ loading }}>
            {loading ? <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div> : children }
        </CheckSessionContext.Provider>
    )
}
export default CheckSession

