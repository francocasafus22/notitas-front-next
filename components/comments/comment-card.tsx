"use client"

import { Edit, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import Loading from "../ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useActionState, useEffect, useState } from "react";
import { deleteCommentAction } from "@/actions/comments/delete-comment-action";

export default function CommentCard({ comment, postId } : {comment: any, postId: string}) {

    const [openDelete, setOpenDelete] = useState(false)

    const deleteCommentWithPostIdAndCommentId = deleteCommentAction.bind(null, comment._id, postId)

    const [state, dispatch, isPending] = useActionState(deleteCommentWithPostIdAndCommentId, {
        errors: [],
        success: ""
    })

    return (
        <div
        className="flex space-x-2 bg-secondary rounded-lg p-5 text-secondary-foreground gap-2 relative"
        key={comment._id}
        >
        {comment.isAuthor && (
            <>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogTrigger asChild>
                <button
                    onClick={() => {}}
                    className="absolute right-0 top-0 m-2 hover:text-destructive transition-all duration-200"
                >
                    <X size={18} />
                </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle>Delete this comment?</DialogTitle>
                    <DialogDescription>
                    This action can&apos;t be undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <form action={dispatch}>
                        <Button
                        variant={"destructive"}
                        className="w-full"
                        onClick={()=>{}}
                        >
                            {isPending ? (
                                <Loading
                                color="border-white"
                                className={"w-4! h-4! border-2!"}
                                />
                                ) : (
                                    "Delete"
                                )
                            }
                        </Button>
                    </form>
                </DialogFooter>
                </DialogContent>
            </Dialog>

                {
                /*          <EditCommentForm
                    open={openEdit}
                    setOpen={setOpenEdit}
                    comment={comment}
                />
                    */    
                }
            </>
        )}
        <Avatar className={"h-10 w-10"}>
            <AvatarImage
            src={comment.authorAvatar || "/logo-placeholder.jpg"}
            alt={comment.authorName}
            ></AvatarImage>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
            <div className="flex items-center gap-2">
            <p className="text-sm font-bold">@{comment.authorName}</p>
            <p className="text-sm text-muted-foreground">
                {new Date(comment.createdAt).toLocaleDateString()}
            </p>
            </div>
            <p>{comment.body}</p>
        </div>
        </div>
    );
}
