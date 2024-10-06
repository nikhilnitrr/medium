import { Heading } from "./Heading"
import { SubHeading } from "./SubHeading"
import { Input } from "./Input"
import { Button } from "./Button"
import { useState } from "react"
import {signinType} from "@nikhilnitrr/zod-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


const SigninElement = () => {
    const [postInputs, setPostInputs] = useState<signinType>({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    return <div className="flex justify-center items-center h-full">
        <div className="w-80">
            <Heading heading="Sign in" />
            <SubHeading subheading="Don't have an account ? " link="/" linkText="Signup" />
            <Input label="Email" placeholder="example@gmail.com" type="text" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email : e.target.value
                })
            }} />
            <Input label="Password" placeholder="password" type="password" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password : e.target.value
                })
            }}/>
            <Button text="Sign In" onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                    ...postInputs
                })
                localStorage.setItem("token", response.data.token)
                navigate("/blogs")
            }}/>
        </div>
    </div>
}

export { SigninElement }