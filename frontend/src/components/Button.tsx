type ButtonText = {
    text : string
    onClick : () => void
}

const Button = ({text, onClick} : ButtonText) => {
    return <div className="bg-black rounded-lg text-white text-center mt-3 p-1 py-2 cursor-pointer">
        <div onClick={onClick}>{text}</div>
    </div>
}

export {Button}