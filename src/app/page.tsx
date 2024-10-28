import Link from "next/link";
import * as actions from "@/actions";
import { redirect } from 'next/navigation';
import XLSXUpload from "@/components/XLSXUpload"
import UserList from "@/components/UserList";

export const dynamic = "force-dynamic";

async function deleteAllUsers() {
  "use server";
  actions.deleteAllUsers();
  redirect("/");
}

export default async function Home() {
  const users = await actions.findUsers();
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
          <form action={deleteAllUsers}>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Delete All</button>
          </form>

          <XLSXUpload />
        </div>
      </header>

      <UserList users={users} />
    </div>

  );

}



