import { getAllUsers } from '@/lib/services/usersService'
import UsersClient from './UsersClient'

export default async function AllUsers({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const { page = '1', search = '' } = await searchParams
  const currentPage = parseInt(page)
  
  const res = await getAllUsers(currentPage, 5, search)
  const users = res.data || []
  const total = res.total || 0

  return (
    <UsersClient 
      users={users} 
      currentPage={currentPage}
      total={total}
      search={search}
    />
  )
}