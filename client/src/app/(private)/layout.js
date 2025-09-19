import GetUser from "@/context/getUser"
import SearchBarProvider from "@/context/searchBar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/feed/app-sidebar"

export default function PrivateLayout({ children }) {
    return (
        <GetUser>
            <SearchBarProvider>
                <main className="w-full px-2">
                    {children}
                </main>
            </SearchBarProvider>
        </GetUser>
    )
}