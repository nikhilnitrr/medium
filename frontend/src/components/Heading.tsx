type HeadingType = {
    heading : string
}

const Heading = ({heading} : HeadingType) => {
    return <div className="text-4xl font-bold text-center mb-2">
        {heading}
    </div>
}

export {Heading}