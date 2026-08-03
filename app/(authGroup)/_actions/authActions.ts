"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success: boolean,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
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

            // Set accessToken
            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
                path: '/'
            })

            // Set refreshToken
            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            // ✅ Set userRole - needed for middleware
            const userRole = result.data.user?.role || result.data.role
            cookieStore.set("userRole", userRole, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            // Redirect to appropriate dashboard based on role
            const dashboard = getDashboardByRole(userRole)
            if (dashboard) {
                redirect(dashboard)
            }
        }

        return result
    } catch (error) {
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

        // If registration successful, set userRole cookie
        if (result.success) {
            const cookieStore = await cookies()
            const userRole = result.data?.role || role
            cookieStore.set("userRole", userRole, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
                path: '/'
            })

            // Redirect to login page after registration
            redirect('/auth/login')
        }

        return result
    } catch (error) {
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

// Helper function to get dashboard URL based on role
function getDashboardByRole(role: string): string | null {
    switch (role?.toUpperCase()) {
        case 'TENANT': return '/tenant-dashboard'
        case 'LANDLORD': return '/landlord-dashboard'
        case 'ADMIN': return '/admin-dashboard'
        default: return null
    }
}