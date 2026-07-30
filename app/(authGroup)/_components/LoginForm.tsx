import { Card } from "@/components/ui/card"
import { loginAction } from "../_actions/authActions"
import { Button } from "@/components/ui/button"

export const LoginForm = () => {
    return (
        <form action={loginAction}>
            <Card className="p-5 space-y-4">
                <input type="email" name="email" placeholder="Enter your email" required />
                <input type="password" name="password" placeholder="Enter your password" required />
                <Button type="submit">
                    Login
                </Button>
            </Card>
        </form>
    )
}