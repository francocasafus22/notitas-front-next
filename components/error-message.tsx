import {AlertCircle} from "lucide-react"

export default function ErrorMessage({message} : {message: string}){
    if(!message)return null

    return(
        <div className="flex items-center gap-1 text-sm text-red-500 mt-0.5">
            <AlertCircle size={16} />
            <span>{message}</span>
        </div>
    )
}