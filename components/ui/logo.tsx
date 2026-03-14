import Image from "next/image";
import Link from "next/link";
export default function Logo() {

    return (
        <Link href={"/"}>
        
            <Image
            src="/logo-notitas.png"
            width={100}
            height={100}
            alt="logo notitas"
            className="w-10 dark:invert rounded-full"            
        />

        </Link>
    )
}
