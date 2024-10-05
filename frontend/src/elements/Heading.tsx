type HeadingType = {
    heading : string
}

const Heading = ({heading} : HeadingType) => {
    return <div className="text-lg font-bold text-center">
        {heading}
    </div>
}

export {Heading}