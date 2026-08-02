'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function updateUserStatus(userId: string, status: string) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/users/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status })
  })

  if (!res.ok) throw new Error("Failed to update")
  
  revalidatePath('/admin-dashboard/users')
  return res.json()
}