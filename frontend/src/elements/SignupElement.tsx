import { Heading } from "./Heading"
import { SubHeading } from "./SubHeading"
import { Input } from "./Input"
import { Button } from "./Button"

const SignupElement = () => {
    return <div className="flex justify-center items-center h-full">
        <div className="w-80">
            <Heading heading="Create an account" />
            <SubHeading subheading="Already have an account ?" link="/signin" linkText="Login" />
            <Input label="Firstname" placeholder="Enter your firstname" type="text"/>
            <Input label="Lastname" placeholder="Enter your lastname" type="text"/>
            <Input label="Email" placeholder="example@gmail.com" type="text" />
            <Input label="Password" placeholder="" type="password"/>
            <Button text="Sign Up" />
        </div>
    </div>
}

export { SignupElement }