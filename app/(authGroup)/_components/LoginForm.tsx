'use client'

import { Card } from "@/components/ui/card"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const initialState = {
    success: false,
    message: "",
    data: {
        accessToken: "",
        refreshToken: ""
    }
}

export const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, initialState)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || "Login successful")
            // Redirect is handled by the server action
        } else if (state?.message) {
            toast.error(state.message)
        }
    }, [state])

    return (
        <form action={action}>
            <Card className="p-5 space-y-4">
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <Button type="submit" disabled={pending}>
                    {pending ? "Submitting..." : "Login"}
                </Button>
            </Card>
        </form>
    )
}