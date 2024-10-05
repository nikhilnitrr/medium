import { Link } from "react-router-dom"

type SubHeadingType = {
    subheading : string,
    link : string,
    linkText : string

}

const SubHeading = ({subheading, link, linkText} : SubHeadingType) => {
    return <div className="text-slate-500 text-md text-center">
        <span>{subheading}</span>
        <span className="underline"><Link to={link}>{linkText}</Link></span>
    </div>
}

export {SubHeading}