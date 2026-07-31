'use client'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useActionState, useEffect } from "react"
import { registerAction, RegisterState } from "../_actions/authActions"
import { toast } from "sonner"

const initialState: RegisterState = {
    success: false,
    message: "",
    data: {
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        status: "",
        createdAt: "",
        updatedAt: ""
    }
}

export const RegisterForm = () => {
    const [state, action, pending] = useActionState(registerAction, initialState)

    // Optional: Show toast when state changes
    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    return (
        <form action={action}>
            <Card className="p-5 space-y-4">
                <input type="text" name="name" placeholder="Enter your name" required />
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <input type="text" name="role" placeholder="Enter your role" required />
                <input type="number" name="phone" placeholder="Enter your phone number" required />
                <Button type="submit">
                    {pending ? "Submitting..." : "Register"}
                </Button>
            </Card>
        </form>
    )
}