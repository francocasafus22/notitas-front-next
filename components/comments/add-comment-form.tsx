"use client"

import { useActionState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import InputForm from "../ui/input-form"
import { addCommentAction } from "@/actions/comments/add-comment-action"
import Loading from "../ui/loading"

export default function AddCommentForm({postId, slug, user} : { postId: string, slug: string, user: any }) {
    

    const addCommentWithPostId = addCommentAction.bind(null, postId)

    const [state, dispatch, isPending] = useActionState(addCommentWithPostId, {
        errors: [],
        success: ""
    })

    return (
        <form
        className="flex space-x-2 bg-secondary rounded-lg p-5 text-secondary-foreground gap-2 items-center justify-center"
        action={dispatch}
        >
        <Avatar className={"h-10 w-10"}>
            <AvatarImage
            src={user.image || "/logo-placeholder.jpg"}
            alt={user.username}
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <InputForm            
            name={"body"}
            placeholder={"Enter your comment"}
            register={()=>{}}
            className={"w-full"}
        />
        <Button
            className={"hover:shadow-xl cursor-pointer"}
            disabled={false}
            type={"submit"}
        >
            {
                isPending ? <Loading color="border-primary-foreground" className="w-5! h-5!"/> : "Comment"
            }
        </Button>
        </form>
    )
}
