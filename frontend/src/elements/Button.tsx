type ButtonText = {
    text : string
}

const Button = ({text} : ButtonText) => {
    return <div className="bg-black rounded-lg text-white text-center mt-3 p-1 py-2">
        <div>{text}</div>
    </div>
}

export {Button}