import axios from "axios"
export async function checkRouteRestriction() {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_LINK_VERIFYSESH}`, {}, { withCredentials: true });
    } catch (error) {
        return {
            message: 'You are not logged in',
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
}