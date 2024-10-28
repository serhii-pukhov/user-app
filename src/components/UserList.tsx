"use client";

import { User } from "@prisma/client";

interface UserListProps {
    users: User[],
    onDelete: (id: string) => void,
}

export default function UserList({ users, onDelete }: UserListProps) {

    return (<div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Email</th>
                    <th className="py-3 px-6">Created At</th>
                    <th className="py-3 px-6">Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers(users, onDelete)}
            </tbody>
        </table>
    </div>);
}

function renderUsers(passedUsers: User[], onDelete: (id: string) => void) {
    console.log(passedUsers);

    if (passedUsers.length == 0) {
        return (
            <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                    No users found.
                </td>
            </tr>
        );
    }

    return passedUsers.map((user) => {
        return (
            <tr key={user.id} className="border-b">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6" suppressHydrationWarning={true}>{user.createdAt.toLocaleString()}</td>
                <td className="py-4 px-6">
                    <button onClick={() => onDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                </td>
            </tr>
        )
    })
}