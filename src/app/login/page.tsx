
import { LoginForm } from "@/components/custom-components/login-form"
import { redirect } from "next/navigation";

export default async function LoginPage() {

    return (
        <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-300 via-white to-indigo-100 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-semibold text-indigo-700">
                    <div className="bg-indigo-600 text-white flex size-8 items-center justify-center rounded-md shadow-sm">
                    </div>
                    Nadhif Tri Aryastya
                </a>

                <LoginForm/>
            </div>
        </div>
    )
}
