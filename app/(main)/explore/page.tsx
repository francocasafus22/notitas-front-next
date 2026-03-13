"use client"

import NoteCard from "@/components/notes/note-card";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function ExplorePage() {

    const search = "";
    const data = {
        posts: [{
            _id: "1",
            title: "Note 1",
            description: "Description 1",
            content: "Content 1",
            tags: ["tag1", "tag2"],
            createdAt: new Date(),
        }],
        page: 1,
        totalPages: 1
    }

    return (
        <>
        <div className="max-w-5xl mx-auto px-5 xl:px-0 my-5 space-y-10 ">
            <h1 className="text-5xl font-bold">Explore</h1>
            <form
            className="flex w-full items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
            >
            <Input
                value={search}
                onChange={()=>{}}
                placeholder="Search note by title"
            />
            <Button className="cursor-pointer" type="submit">
                Search
            </Button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
            {data.posts.length != 0 ? (
                data.posts.map((post) => (
                <NoteCard post={post} key={post._id} canLike canDelete/>
                ))
            ) : (
                <p>No notes found</p>
            )}
            </div>

            <Pagination
            currentPage={data.page}
            totalPages={data.totalPages}
            onPageChange={(page) => () => console.log(page)}
            />
        </div>
        </>
    );
}
