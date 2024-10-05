import { Quote } from "../elements/Quote"
import { SignupElement } from "../elements/SignupElement"

const Signup = () => {
    return <div className="grid grid-cols-2 h-screen">
        <div className="col-span-2 md:col-span-1">
            <SignupElement />
        </div>
        <div className="col-span-2 md:col-span-1 pt-10 md:pt-0">
            <Quote quote="The customer service I received was exceptional. The support team went above and beyond to address my concerns." author="Jules Winfield" designation="CEO, Acme Inc" />
        </div>
    </div>
}

export { Signup }