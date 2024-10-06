import { Quote } from "../components/Quote"
import { SignupElement } from "../components/SignupComponent"
import { Me } from "../components/MeComponent"
import { useState } from "react"

const Signup = () => {
    const [meLoading, setMeLoading] = useState(true)
    return <>
        <Me setMeLoading={setMeLoading} successRoute="/blogs" failureRoute="/"/>
        {meLoading ? <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
                <span className="sr-only"></span>
            </div> : <div className="grid grid-cols-2 h-screen">
            <div className="col-span-2 md:col-span-1">
                <SignupElement />
            </div>
            <div className="col-span-2 md:col-span-1 pt-10 md:pt-0">
                <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." author="Jules Winfield" designation="CEO, Acme Inc" />
            </div>
        </div>}
    </>
}

export { Signup }