import { cookies } from "next/headers"

export const getAllUsers = async (page: number = 1, limit: number = 5, search: string = '') => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/users?page=${page}&limit=${limit}&search=${search}`,
    {
      cache: 'no-store',
      headers: { Authorization: `Bearer ${accessToken}` }
    }
  )
  return res.json()
}

