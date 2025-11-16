'use client'

import { useState } from "react"
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

export function RecoveryOTPForm() {
    // state untuk OTP
    const [otp, setOtp] = useState(["", "", "", ""])

    // fungsi handle perubahan tiap digit
    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return // hanya angka
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // auto fokus ke input berikutnya
        if (value && index < 3) {
            const next = document.getElementById(`otp-${index + 1}`)
            next?.focus()
        }
    }

    // fungsi submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const otpCode = otp.join("")
        console.log("OTP Submitted:", otpCode)
        // TODO: kirim OTP ke backend untuk verifikasi
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full shadow-md border border-blue-100 bg-white/90 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-blue-700">
                        Recovery Password !!
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Sign in to continue your journey
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-6">
                        {/* OTP Input */}
                        <div className="flex gap-3 justify-center ">
                            {otp.map((digit, i) => (
                                <Input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    className="w-14 h-14 text-center text-lg font-semibold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
                                />
                            ))}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors mt-2"
                        >
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
