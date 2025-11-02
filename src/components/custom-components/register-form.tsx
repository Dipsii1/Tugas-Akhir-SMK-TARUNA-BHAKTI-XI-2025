'use client'

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


import { registerUser } from "@/app/lib/actions";

export function RegisterForm() {
    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/" }) // arahkan ke homepage setelah login
    }

    return (
        <form action={registerUser}>
            <Card className="w-full shadow-md border border-indigo-100 bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-indigo-700">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Sign in to continue your journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">

                        <div className="grid gap-3">
                            <Label htmlFor="name">Username</Label>
                            <Input
                                id="name"
                                type="name"
                                name="name"
                                placeholder="johndoe"
                                required
                            />
                        </div>

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

                        <div className="grid gap-3">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="******"
                                name="password"
                                required
                            />
                        </div>

                        <Button

                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                        >
                            Register
                        </Button>

                        <div className="relative text-center">
                            <span className="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
                            <span className="relative bg-white px-2 text-gray-500 text-sm">or</span>
                        </div>

                        {/* Tombol Google */}
                        <Button
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            <FcGoogle size={22} />
                            Continue with Google
                        </Button>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/register"
                                className="text-indigo-600 hover:text-indigo-700 font-medium underline underline-offset-4"
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
