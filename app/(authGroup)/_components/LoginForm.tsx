'use client'

import { Card } from "@/components/ui/card"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Login successful!")
      
      // Get role from state or decode from token
      const userRole = state.data?.userRole || 'TENANT'
      
      // Redirect based on role
      const dashboards: Record<string, string> = {
        'TENANT': '/tenant-dashboard',
        'LANDLORD': '/landlord-dashboard',
        'ADMIN': '/admin-dashboard'
      }
      
      const dashboard = dashboards[userRole] || '/tenant-dashboard'
      router.push(dashboard)
    } else if (state?.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, router])

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