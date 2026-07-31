"use server"

import { cookies } from "next/headers"

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
            const cookieStore = await cookies() // license to access the cookies in browser

            // setting the accessToken in the browser cookies
            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            })

            // setting the accessToken in the browser cookies
            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax"
            })
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

        // Return the result in the expected format
        return result
    } catch (error) {
        // Return an error state
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