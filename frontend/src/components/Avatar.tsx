interface AvatarType {
    firstName: string,
    lastName: string,
    publishedOn: string
}


const Avatar = ({ firstName, lastName, publishedOn }: AvatarType) => {
    return <div>
        <div className="flex items-center">
            <div className="rounded-full px-3 py-1 bg-green-500 font-thin">{firstName[0].toUpperCase()}</div>
            <div className="pt-1 text-sm font-medium mx-2">{firstName}{lastName[0].toUpperCase()}{"."}</div>
            <div className="pt-1 text-sm font-thin">{publishedOn}</div>
        </div>
    </div>
}

export { Avatar }