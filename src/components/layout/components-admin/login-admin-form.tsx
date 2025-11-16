'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FcGoogle } from "react-icons/fc"
import { redirect } from "next/navigation"
import { Eye, EyeOff, Book } from "lucide-react"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/dashboard" })
    }

    async function handleSubmit(formLogin: FormData) {
        const email = String(formLogin.get('email'))
        const password = String(formLogin.get('password'))

        if (!email || !password) {
            alert("Please fill in all fields.")
            return
        }

        const result = await signIn("credentials", {
            redirect: true,
            email,
            password,
            callbackUrl: "/admin/dashboard",
        })

        if (result?.error) {
            alert("Login failed: " + result.error)
            return
        }
    }

    return (
        <form action={handleSubmit}>
            <Card className="w-full shadow-md border border-blue-100 bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-blue-700">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Sign in to continue your journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">

                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                name="email"
                                required
                            />
                        </div>

                        <div className="grid gap-3 relative">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="******"
                                    name="password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            Login
                        </Button>

                        <div className="relative text-center">
                            <span className="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
                            <span className="relative bg-white px-2 text-gray-500 text-sm">or</span>
                        </div>

                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            <FcGoogle size={22} />
                            Continue with Google
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <a
                                href="/register"
                                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
                            >
                                Sign up
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
