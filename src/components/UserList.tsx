"use client";

import { User } from "@prisma/client";
import { deleteUser } from "@/actions";
import { useState } from "react";

interface UserListProps {
    users: User[]
}
export default function UserList(props: UserListProps) {
    
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
                {renderUsers(props.users)}
            </tbody>
        </table>
    </div>);
}

function renderUsers(passedUsers: User[]) {
    const [users, setUsers] = useState(passedUsers);

    const handleDelete = (id: string) => {
        deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
    }
    if (users.length == 0) {
        return (
            <tr>
                <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                    No users found.
                </td>
            </tr>
        );
    }

    return users.map((user) => {
        return (
            <tr key={user.id} className="border-b">
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6" suppressHydrationWarning={true}>{user.createdAt.toLocaleString()}</td>
                <td className="py-4 px-6">
                    <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
                </td>
            </tr>
        )
    })
}