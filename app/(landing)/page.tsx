import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full  items-center justify-center px-5">
      <h1 className="text-7xl md:text-8xl font-extrabold mb-6 text-center">Notitas</h1>
      <p className="text-3xl text-center mb-4 text-muted-foreground">
        Write your ideas and share with the world
      </p>
      <p className="text-lg text-center text-muted-foreground max-w-xl mb-5">
        Organize your notes, create posts, and connect with others. Notitas is your space to 
        capture thoughts, ideas, and inspiration in one place.
      </p>
      <div className="flex gap-2">
        <Button><Link href={"/login"}>Write</Link></Button>
        <Button variant={"secondary"}><Link href={"/explore"}>Explore</Link></Button>
      </div>
    </div>
  );
}
