
import LoginForm from '@/components/auth/login-form'
import InputForm from '@/components/ui/input-form'
import Logo from '@/components/ui/logo'
import { Metadata } from 'next'
import Link from 'next/link'


export const metadata: Metadata = {
    title: "Notitas - Login",
    description: "Write your ideas and share with the world",
}

export default function LoginPage() {

    

    return (

        <div className="flex flex-col items-center justify-center h-screen w-full max-w-lg px-10  gap-2">
                <Logo widht={75}/>
                <p className="text-center text-3xl font-bold flex items-center gap-2">
                Notitas
                </p>            
                <p className="text-sidebar-ring">Explore and share notes with the world</p>
            

            <LoginForm/>


            <Link href={"/register"} className="text-sm text-center mt-5 group">
                    Don´t have an account?{" "}
                    <span className="text-primary font-bold ">
                    Sign up
                    </span>
                </Link>
        </div>
        
    )
}
