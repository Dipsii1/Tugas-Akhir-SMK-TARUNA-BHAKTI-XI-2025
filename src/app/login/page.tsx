
import { LoginForm } from "@/components/layout/login-form"
import { Book } from "lucide-react";

export default async function LoginPage() {

    return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-300 via-white to-blue-100 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div
          className="flex items-center gap-2 self-center font-semibold text-blue-700"
        >
          <div className="bg-blue-600 text-white flex items-center justify-center rounded-md shadow-sm p-2">
            <Book className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold">LibroSpace</span>
        </div>

        <LoginForm />
      </div>
    </div>
    )
}
