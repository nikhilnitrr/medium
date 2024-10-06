import { Avatar } from "./Avatar";
import { useNavigate } from "react-router-dom";

interface BlogInterface {
    firstName: string,
    lastName: string,
    publishedOn: string,
    title: string,
    content: string,
    id : number
}

const BulkContent = ({ firstName, lastName, publishedOn, title, content , id}: BlogInterface) => {
    const navigate = useNavigate()

    return <div className="mt-2 mx-2 cursor-pointer" onClick={() => {
        navigate(`/blog/${id}`)
    }}>
            <div className="pb-10 pt-3 border-b-2">
                <Avatar firstName={firstName} lastName={lastName} publishedOn={publishedOn} />
                <div className="text-3xl font-bold mt-2 mb-2">{title}</div>
                <div className="text-lg font-light">{content.length > 100 ? content.slice(0, 100) + "..." : content}</div>
            </div>
    </div>
}

export { BulkContent }