'use client'

import { Card } from "@/components/ui/card"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const LoginForm = () => {

    const [state, action, pending] = useActionState(loginAction, false)
    const router = useRouter()

    useEffect(() => {
        if (!state) {
            toast.error(state.message || "Login failed")
        }
        if (state.success) {
            toast.success(state.message)
            router.push('/dashboard')
        }
        if (!state.success) {
            toast.success(state.message)
        }
    }, [state])
    return (
        <form action={action}>
            <Card className="p-5 space-y-4">
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <Button type="submit">
                    {pending ? "submitting" : " Login"}
                </Button>
            </Card>
        </form>
    )
}