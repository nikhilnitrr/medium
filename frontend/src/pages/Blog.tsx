import { AppBar } from "../components/AppBar"
import { useEffect, useState } from "react"
import { BulkContent } from "../components/BulkContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Me } from "../components/MeComponent"

const Blog = () => {
    const [loading, setLoading] = useState(true)
    const [meLoading, setMeLoading] = useState(true)
    const [blogs, setBlogs] = useState<{
        title: string,
        content: string,
        id : number,
        author : {
            firstName : string
            lastName : string
        }
    }[]>([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setBlogs(response.data.data)
                setLoading(false)
            })
    }, [blogs])

    return <>
    <Me setMeLoading={setMeLoading} successRoute="/blogs" failureRoute="/signin"/>
    {
        meLoading ? <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
    </div> : <div>
        <AppBar authorName="nikhil" />
        <div className="flex justify-center">
            <div>
                {loading ? <div role="status" className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
    </div> : blogs.map((blog) => {
                    return <BulkContent key={blog.id} title={blog.title} content={blog.content} firstName={blog.author.firstName} lastName={blog.author.lastName} publishedOn="1st october 2024" id={blog.id} />
                })}
            </div>
        </div>
    </div>
    }
    </>
}

export { Blog }