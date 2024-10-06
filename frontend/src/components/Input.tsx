type InputType = {
    label : string,
    placeholder : string,
    type : string,
    onChange : (e : any) => void
}

const Input = ({label, placeholder, type, onChange} : InputType) => {
    return <div className="text-lg my-2 py-1">
        <div className="text-bold">{label}</div>
        <input className="border rounded w-full px-2 py-1" type={type} placeholder={placeholder} onChange={onChange}></input>
    </div>
}

export {Input}