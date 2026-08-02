'use client'

import { toast } from 'sonner'
import { updateUserStatus } from './updateUserStatus'
import { User } from '../admin/users/UsersClient'
import { Button } from '@/components/ui/button'

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
            <Button
                onClick={handleToggle}
                className={user.status === 'ACTIVE' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}
            >
                {user.status === 'ACTIVE' ? 'Block' : 'Activate'}
            </Button>
        </>
    )
}