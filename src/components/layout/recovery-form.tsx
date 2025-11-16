'use client'

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

export function RecoveryForm() {

    return (
        <form>
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
                    <div className="grid gap-6 ">

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

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors mt-2"
                        >
                            Submit
                        </Button>
                        <a href="" className="text-center text-blue-500 text">Back To Login</a>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
