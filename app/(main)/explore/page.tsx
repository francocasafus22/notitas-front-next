
import NoteCard from "@/components/notes/note-card";
import Pagination from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getNotes } from "@/src/services/notes.service";
import ExploreClient from "./explore-client";
import { getSession, verifySession } from "@/src/auth/dal";


export default async function ExplorePage() {

    const data = await getNotes();        

    return (
        <ExploreClient initalData={data} />
    );
}
