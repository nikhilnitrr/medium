import { useNavigate } from "react-router-dom"

const AppBar = ({authorName} : {authorName : string}) => {
    const navigate = useNavigate()
    return <div>
        <div className="flex justify-between mt-2 border-b-2 pb-5 pt-2">
            <div className="px-5 text-semibold">Medium</div>
            <div className="px-5">
                <span onClick={() => {
                    navigate('/create')
                }} className="px-3 border rounded-xl mx-2 bg-slate-500 text-white font-light py-1 cursor-pointer">New blog</span>
                <span onClick={() => {
                    localStorage.removeItem("token")
                    navigate('/signin')
                }}className="px-3 border rounded-xl mx-2 text-white bg-slate-500 font-light py-1 cursor-pointer">Logout</span>
                <span className="px-2 border rounded-full mx-2 py-1 bg-green-500">{authorName[0].toUpperCase()}</span>
            </div>
        </div>
    </div>
}

export {AppBar}