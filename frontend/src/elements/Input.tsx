type InputType = {
    label : string,
    placeholder : string,
    type : string
}

const Input = ({label, placeholder, type} : InputType) => {
    return <div className="text-md my-2">
        <div className="text-bold">{label}</div>
        <input className="border rounded w-full px-2 py-1" type={type} placeholder={placeholder}></input>
    </div>
}

export {Input}