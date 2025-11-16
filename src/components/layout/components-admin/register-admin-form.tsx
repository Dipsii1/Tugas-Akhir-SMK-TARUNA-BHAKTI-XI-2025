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
import { Eye, EyeOff } from "lucide-react"

import { registerAdmin } from "@/app/lib/actions"

export function RegisterForm() {
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(false) // 👈 state untuk toggle


  const validatePassword = (value: string) => {
    const strongPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    setPasswordError(
      strongPassword.test(value)
        ? ""
        : "Password minimal 8 karakter, mengandung 1 huruf besar & 1 angka."
    );
  }

  return (
    <form action={registerAdmin} className="space-y-6">
      <Card className="w-full shadow-md border border-blue-100 bg-white/90 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-blue-700">
            Create an account Admin
          </CardTitle>
          <CardDescription className="text-gray-500">
            Join us and start your journey today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Username</Label>
              <Input id="name" name="name" placeholder="johndoe" required />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    validatePassword(e.target.value)
                  }}
                  required
                  className="pr-10" // ruang untuk ikon
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              disabled={!!passwordError}
            >
              Register
            </Button>

            <div className="relative text-center">
              <span className="absolute inset-x-0 top-1/2 border-t border-gray-200"></span>
              <span className="relative bg-white px-2 text-gray-500 text-sm">or</span>
            </div>


            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
              >
                Sign in
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
