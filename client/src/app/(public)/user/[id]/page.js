import { notFound } from "next/navigation"

const UserPage = ({ params }) => {
    const name = 'aman'
    if (params.id !== name) {
        notFound()
    }
    return (
        <div>{params.id}</div>
    )
}
export default UserPage