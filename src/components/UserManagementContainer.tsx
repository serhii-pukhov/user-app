"use client";

import { User } from "@prisma/client";
import XLSXUpload from "@/components/XLSXUpload"
import UserList from "@/components/UserList";
import * as actions from "@/actions";
import { useState } from "react";
import Link from "next/link";

interface UserManagementContainerProps {
    users: User[]
}

export default function UserManagementContainer({ users }: UserManagementContainerProps) {
    const [usersInState, setUsers] = useState(users);

    const handleDelete = (id: string) => {
        actions.deleteUser(id);
        setUsers(usersInState.filter((user) => user.id !== id));
    }

    async function handleDeleteAll() {
        await actions.deleteAllUsers();
        setUsers([]);
    }

    async function handleImport() {
        const usersFromDb = await actions.findUsers();

        setUsers(usersFromDb);
    }

    return (
        <div>
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <div className="flex space-x-3">
                    <Link href="/users/new">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                            Create
                        </button>
                    </Link>
                    <form action={handleDeleteAll}>
                        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Delete All</button>
                    </form>

                    <XLSXUpload onImport={handleImport} />
                </div>
            </header>

            <UserList users={usersInState} onDelete={handleDelete} />
        </div>

    );
}