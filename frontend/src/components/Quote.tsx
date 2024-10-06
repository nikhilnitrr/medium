type QuoteType = {
    quote: string,
    author: string,
    designation: string
}


const Quote = ({ quote, author, designation }: QuoteType) => {
    return <div className="flex items-center justify-center bg-slate-200 h-full text-center">
        <div className="w-80">
            <div className="text-3xl font-semi-bold">"{quote}"</div>
            <div className="font-bold text-sm pt-5">{author}</div>
            <div className="text-slate-400 text-sm">{designation}</div>
        </div>
    </div>
}

export { Quote }