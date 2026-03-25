

import { Heart, X } from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import InputForm from "../ui/input-form";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import LikeNoteForm from "./like-note-form";



export default function NoteCard({ post, canDelete, canLike } : {post: any, canDelete: boolean, canLike: boolean}) {
    
    return (
        <Link
        href={`/${post.authorName}/post/${post.slug}`}
        className={`p-8 rounded-xl border border-border bg-secondary text-secondary-foreground shadow-md relative transition-shadow duration-200 ${false ? "cursor-default" : "cursor-pointer hover:shadow-xl"}`}        
        key={post.slug}
        >
        <div className="flex flex-col h-full justify-between gap-2">
            {canDelete && (
            <Dialog open={false} onOpenChange={()=>{}}>
                <DialogTrigger asChild>
                <button
                    onClick={()=>{}}
                    className="absolute right-0 top-0 m-2 hover:text-destructive transition-all duration-200"
                >
                    <X size={18} />
                </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-106.25" onInteractOutside={()=>{}}>
                <form className="space-y-5" onSubmit={()=>{}}>
                    <DialogHeader>
                    <DialogTitle>
                        Are you sure you want to delete this note?
                    </DialogTitle>
                    <DialogDescription>
                        This action can&apos;t be undone.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-3">
                    <InputForm
                        label={`Password`}
                        name={"password"}
                        required
                        placeholder={"Enter your password"}                        
                        error={""}
                    />
                    </div>
                    <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" variant={"destructive"}>
                        Delete
                    </Button>
                    </DialogFooter>
                </form>
                </DialogContent>
            </Dialog>
            )}

            <div className="space-y-2">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <div className="flex-wrap space-x-1 space-y-1">
                {post.tags.map((tag : string) => (
                <Badge key={tag}>{tag}</Badge>
                ))}
            </div>
            <p className="text-muted-foreground text-base line-clamp-5">
                {post.description}
            </p>
            </div>

            <div className="flex pt-2  justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <img
                src={post.authorAvatar}
                className="w-8 h-8 rounded-full border border-border object-cover"
            />
                <span className="font-medium">@{post.authorName}</span>
                <span>•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>                

                {
                    canLike &&  
    
                            <LikeNoteForm post={post}/>
    
                }

            </div>
        </div>
        </Link>
    );
}
