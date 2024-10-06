import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { AppBar } from "../components/AppBar"
import { Me } from "../components/MeComponent"

const BlogDetail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [meLoading, setMeLoading] = useState(true)
    const [blog, setBlog] = useState<{
        title: string,
        content: string,
        author: {
            firstName: string,
            lastName: string,
            email: string
        }
    }>({ title: "", content: "", author: { firstName: "", lastName: "", email: "" } })

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/id/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setBlog(response.data.data)
                setLoading(false)
            })
    }, [id, blog, loading])

    return <>
        <Me setMeLoading={setMeLoading} successRoute={`/blog/${id}`} failureRoute="/signin" />
        {
            meLoading ? "loading..." : <div>
                {loading ? null : <AppBar authorName={blog.author.firstName} />}
                {loading ? "loading...." :
                    <div className="grid grid-cols-12 h-screen">
                        <div className="col-span-8 text-center pt-10">
                            <div className="text-4xl font-semibold">{blog.title}</div>
                            <div className="text-2xl font-light">{blog.content}</div>
                        </div>
                        <div className="col-span-4 bg-slate-200 px-5 pt-10">
                            <div className="text-3xl font-semibold pb-2">Author</div>
                            <div className="text-xl font-light">
                                <div>{blog.author.firstName}</div>
                                <div>{blog.author.lastName}</div>
                                <div>{blog.author.email}</div>
                            </div>
                            <div className="text-3xl pt-10 font-semibold pb-2">About Me</div>
                            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint officia commodi, quod tempora possimus enim placeat ratione magnam aliquid nam repudiandae, provident, ducimus natus quo. Illum dolores est ipsum recusandae?</div>
                        </div>
                    </div>
                }
            </div>
        }
    </>

}

export { BlogDetail }