'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkRouteRestriction } from "@/utils/checkRouteRestriction";
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  // const [loading, setLoading] = useState(true)
  // const router = useRouter()
  // useEffect(() => {
  //   checkRouteRestriction().then((res) => res.redirect ? router.push(res.redirect.destination) : setLoading(false))
  // }, [])
  return (
    <div>
      {/* {
        loading ?
          (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : <h1>Home</h1>
      } */}
      <h1>Home</h1>
    </div>
  );
}
