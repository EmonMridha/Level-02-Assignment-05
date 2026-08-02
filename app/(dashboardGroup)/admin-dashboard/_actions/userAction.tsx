'use client'

import { User } from "../admin/users/page"
import { updateUserStatus } from "./updateUserStatus"


export default function UserActions({ user }: { user: User }) {
    const handleToggle = async () => {
        const newStatus = user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE'
        await updateUserStatus(user.id, newStatus)
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