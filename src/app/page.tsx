import Link from "next/link";
import * as actions from "@/actions";
import { redirect } from 'next/navigation';
import XLSXUpload from "@/components/XLSXUpload"

export const dynamic = "force-dynamic";

async function deleteAllUsers() {
  "use server";
  actions.deleteAllUsers();
  redirect("/");
}

async function deleteUser(id: string) {
  "use server";
  actions.deleteUser(id);
  redirect("/");
}

export default async function Home() {

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 text-black">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            <Link href="/users/new">Create</Link>
          </button>
          <form action={deleteAllUsers}>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Delete All</button>
          </form>
          <XLSXUpload />
          {/* <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Import</button> */}
        </div>
      </header>

      {/* User List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
            {renderUsers()}
          </tbody>
        </table>
      </div>
    </div>

  );

}

async function renderUsers() {
  "use server";
  const users = await actions.findUsers();

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
    const deleteUserAction = deleteUser.bind(null, user.id);
    return (
      <tr key={user.id} className="border-b">
        <td className="py-4 px-6">{user.name}</td>
        <td className="py-4 px-6">{user.email}</td>
        <td className="py-4 px-6">{user.createdAt.toLocaleString()}</td>
        <td className="py-4 px-6">
          <form action={deleteUserAction}>
            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">Delete</button>
          </form>

        </td>
      </tr>


    )
  })
}

