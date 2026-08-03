"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success: boolean,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string,
        userRole?: string  // ← Add optional userRole
    }
}

export type RegisterState = {
    success: boolean,
    message: string,
    data: {
        id: string,
        name: string,
        email: string,
        phone: string,
        role: string,
        status: string,
        createdAt: string,
        updatedAt: string
    }
}

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    try {
        const email = formData.get('email')
        const password = formData.get('password')
        const payload = {
            email,
            password
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            const cookieStore = await cookies()

            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                path: '/'
            })

            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            const token = result.data.accessToken
            const payloadBase64 = token.split('.')[1]
            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())
            const userRole = payload?.role || 'TENANT'

            cookieStore.set("userRole", userRole, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            // ❌ REMOVE this redirect:
            // const dashboard = getDashboardByRole(userRole)
            // if (dashboard) {
            //     redirect(dashboard)
            // }

            // ✅ Return success with role for client-side redirect
            return {
                success: true,
                message: result.message || "Login successful",
                data: {
                    accessToken: result.data.accessToken,
                    refreshToken: result.data.refreshToken,
                    userRole: userRole  // ← Add role to return
                }
            }
        }

        return result
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
            throw error
        }
        return {
            success: false,
            message: "Login failed",
            data: {
                accessToken: "",
                refreshToken: ""
            }
        }
    }
}

export const registerAction = async (prevState: RegisterState, formdata: FormData): Promise<RegisterState> => {
    const name = formdata.get('name')
    const email = formdata.get('email')
    const password = formdata.get('password')
    const role = formdata.get('role')
    const phoneNumber = formdata.get('phone')

    const payload = {
        name,
        email,
        password,
        role,
        phoneNumber
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const result = await res.json()

        if (result.success) {
            const cookieStore = await cookies()
            const userRole = result.data?.role || role
            cookieStore.set("userRole", userRole, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            // redirect('/auth/login')
        }

        return result
    } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
            throw error
        }
        console.error("Registration error:", error)
        return {
            success: false,
            message: "Registration failed",
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
    }
}

function getDashboardByRole(role: string): string | null {
    switch (role?.toUpperCase()) {
        case 'TENANT': return '/tenant-dashboard'
        case 'LANDLORD': return '/landlord-dashboard'
        case 'ADMIN': return '/admin-dashboard'
        default: return null
    }
}