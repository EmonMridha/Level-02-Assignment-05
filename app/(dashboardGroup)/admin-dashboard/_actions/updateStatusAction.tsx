'use client'

import { toast } from 'sonner'
import { updateUserStatus } from './updateUserStatus'
import { User } from '../admin/users/UsersClient'

export default function UserActions({ user }: { user: User }) {
    const handleToggle = async () => {
        const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
        try {
            await updateUserStatus(user.id, newStatus)
            toast.success(`User ${newStatus === 'ACTIVE' ? 'activated' : 'blocked'} successfully`)
        } catch {
            toast.error('Failed to update user status')
        }
    }

    return (
        <>
            <button className="text-blue-600 mr-3">Edit</button>
            <button
                onClick={handleToggle}
                className={user.status === 'ACTIVE' ? 'text-red-600' : 'text-green-600'}
            >
                {user.status === 'ACTIVE' ? 'Block' : 'Activate'}
            </button>
        </>
    )
}