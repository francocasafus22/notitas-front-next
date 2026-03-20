import AddCommentForm from "@/components/comments/add-comment-form";
import CommentCard from "@/components/comments/comment-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSession, verifySession } from "@/src/auth/dal";
import { getComments } from "@/src/services/comments.service";
import { getNote } from "@/src/services/notes.service";
import { Metadata } from "next";
import Link from "next/link";


export default async function Page({ params }: {
    params: { user: string; postSlug: string }
}) {
    
    const {postSlug} = await params;
    const post = await getNote(postSlug);
    const session = await getSession()
    const comments = await getComments(post._id);
    const isLoadingComments = comments === null ? true : false

    return (
        <div className="mx-auto container lg:max-w-3xl xl:max-w-5xl my-10 px-5 lg:px-0 space-y-10">
            
            <div>
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <p className="text-muted-foreground text-lg my-5">{post.description}</p>
                <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 mb-15">
                <div className="flex gap-2">
                    <Badge
                    className={
                        "flex gap-1 text-sm hover:shadow-xl transition-all duration-200 cursor-pointer"
                    }                    
                    >
                    <Avatar className={"h-6 w-6"}>
                        <AvatarImage
                        src={post.authorAvatar || "/logo-placeholder.jpg"}
                        alt={post.authorName}
                        ></AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    @{post.authorName}
                    </Badge>
                    <Badge variant={"secondary"}>
                    Created {new Date(post.createdAt).toLocaleDateString()}
                    </Badge>
                </div>

                <div className="flex gap-2">
                    {post.tags.map((tag : string) => (
                    <Badge variant={"secondary"} key={tag}>
                        {tag}
                    </Badge>
                    ))}
                </div>
                </div>{" "}
            </div>

            {/*<MarkdownView content={post.body}></MarkdownView>*/}

            <p className="text-5xl font-bold border-t-2 pt-5 border-border ">
                Comentarios
            </p>

            <div className="space-y-2">
                <>
                {session?.isAuth && <AddCommentForm postId={post._id} slug={postSlug} user={session?.user} />}
                {isLoadingComments ? (
                    <p>Cargando...</p>
                ) : (
                    comments.map((comment : any) => (
                    <CommentCard comment={comment} key={comment._id} slug={postSlug} />
                    ))
                )}
                {comments?.length == 0 && (
                    <p className="font-semibold text-md mt-5">
                    Be the first to comment
                    </p>
                )}
                </>
            </div>


            <Link className="flex items-center justify-center mt-10" href={"/explore"}>
                <Button
                className={
                    "cursor-pointer hover:shadow-xl transition-all duration-200"
                }
                >
                Volver
                </Button>
            </Link>
        </div>
    )
}


