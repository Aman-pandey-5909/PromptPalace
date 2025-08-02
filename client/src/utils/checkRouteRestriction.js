import axios from "axios"
export async function checkRouteRestriction() {
    try {
        console.log("checkRouteRestriction Try block Reached before post"); // Reached Here
        await Promise.race([
            await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_VERIFYSESH}`, {}, { withCredentials: true }),
            new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000))
        ])
        console.log("checkRouteRestriction Try block Reached after post"); // Unreachable
        return true
    } catch (error) {
        return false
    }
}