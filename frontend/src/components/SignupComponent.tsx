import { Heading } from "./Heading"
import { SubHeading } from "./SubHeading"
import { Input } from "./Input"
import { Button } from "./Button"
import { useState } from "react"
import {signupType} from "@nikhilnitrr/zod-common"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

const SignupElement = () => {
    const [postInputs, setPostInputs] = useState<signupType>({
        firstName : "",
        lastName : "",
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    return <div className="flex justify-center items-center h-full">
        <div className="w-80">
            <Heading heading="Sign up" />
            <SubHeading subheading="Already have an account ? " link="/signin" linkText="Login" />
            <Input label="Firstname" placeholder="Enter your firstname" type="text" onChange={(e) => {
               setPostInputs({
                ...postInputs,
                firstName : e.target.value
               }) 
            }}/>
            <Input label="Lastname" placeholder="Enter your lastname" type="text" onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    lastName : e.target.value
                })
            }}/>
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
            <Button text="Sign Up" onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                    ...postInputs
                })
                localStorage.setItem("token", response.data.token)
                navigate("/blogs")
            }}/>
        </div>
    </div>
}

export { SignupElement }