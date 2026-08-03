'use server'

import { cookies } from "next/headers"

export async function fetchProperties() {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
        cache: 'no-store'
    })
    const result = await res.json()
    return result.data || []
}