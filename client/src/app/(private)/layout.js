import GetUser from "@/context/getUser"
import SearchBarProvider from "@/context/searchBar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/feed/app-sidebar"

export default function PrivateLayout({ children }) {
    return (
        <GetUser>
            <SearchBarProvider>
                <SidebarProvider >
                    <AppSidebar />
                    <main className="w-full px-2">
                        <SidebarTrigger className={"fixed top-0 z-10"} />
                        {children}
                    </main>
                </SidebarProvider>
            </SearchBarProvider>
        </GetUser>
    )
}