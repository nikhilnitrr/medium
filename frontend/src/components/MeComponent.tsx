import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"


interface MeInterface {
    successRoute : string,
    failureRoute : string,
    setMeLoading : any
}

const Me = ({successRoute, failureRoute, setMeLoading} : MeInterface) => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`${BACKEND_URL}/me` , {
            headers : {
                Authorization : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(() => {
            setMeLoading(false)
            navigate(`${successRoute}`)
        })
        .catch(() => {
            setMeLoading(false)
            navigate(`${failureRoute}`)
        })
    },[])
    return <></>
}

export {Me}