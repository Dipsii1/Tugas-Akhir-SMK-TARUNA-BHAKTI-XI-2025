'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
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
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = String(formData.get('email'))
        const password = String(formData.get('password'))

        if (!email || !password) {
            alert("Please fill in all fields.")
            setIsLoading(false)
            return
        }

        try {
            const result = await signIn("credentials", {
                redirect: false,
                email,
                password,
            })

            if (result?.error) {
                alert("Login failed: " + result.error)
                setIsLoading(false)
                return
            }

            if (result?.ok) {
                const response = await fetch('/api/auth/session')
                const session = await response.json()
                
                if (session?.user?.role === "admin") {
                    router.push("/admin/dashboard")
                } else if (session?.user?.role === "siswa") {
                    router.push("/homepage")
                } 
                router.refresh()
            }
        } catch (error) {
            console.error("Login error:", error)
            alert("An error occurred during login")
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
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
                                disabled={isLoading}
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
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing in..." : "Login"}
                        </Button>

                        <div className="relative text-center">
                            <span className="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
                            <span className="relative bg-white px-2 text-gray-500 text-sm">or</span>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Dont have an account?{" "}
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
