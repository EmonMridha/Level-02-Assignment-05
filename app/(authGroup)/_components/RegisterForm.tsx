'use client'

import { Card } from "@/components/ui/card"
import { registerAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const initialState = {
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
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message || "Registration successful! Please login.")
      router.push('/auth/login')
    } else if (state?.message && !state.success) {
      toast.error(state.message)
    }
  }, [state, router])

  return (
    <form action={action}>
      <Card className="p-5 space-y-4">
        <input type="text" name="name" placeholder="Full name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="text" name="phone" placeholder="Phone number" required />
        <select name="role" required>
          <option value="">Select role</option>
          <option value="TENANT">Tenant</option>
          <option value="LANDLORD">Landlord</option>
          <option value="ADMIN">Admin</option>
        </select>
        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Register"}
        </Button>
      </Card>
    </form>
  )
}