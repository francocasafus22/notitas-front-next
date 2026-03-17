import Image from "next/image";
import Link from "next/link";
export default function Logo({widht = 50, height = 50} : {widht?: number, height?: number}) {

    return (
        <Link href={"/"}>
        
            <Image
            src="/logo-notitas.png"
            width={widht}
            height={height}
            alt="logo notitas"
            className=" dark:invert rounded-full"            
        />

        </Link>
    )
}
