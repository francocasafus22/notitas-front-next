import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import Logo from "./logo";



export default function Footer() {
  return (
    <footer className="w-full bg-primary dark:bg-primary-foreground text-primary-foreground py-10 mt-10">
      <div className="px-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex gap-2 items-center invert dark:invert-0">
          <Logo />
          <span className="text-xl font-bold text-muted-foreground">Notitas</span>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} - Notitas
        </div>
      </div>
    </footer>
  );
}
