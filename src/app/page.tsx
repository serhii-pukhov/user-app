

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
  const users = await actions.findUsers();

  const renderedUsers = users.map((user) => {
    const deleteUserAction = deleteUser.bind(null, user.id);
    return (
      <div>
        <p>--------</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Created At: {user.createdAt.toLocaleString()}</p>
        <p>
          <form action={deleteUserAction}>
            <button >Delete</button>
          </form>
        </p>
      </div>

    )
  })

  return (
    <div>
      <div>
        <h1>Users</h1>
        <Link href="/users/new">New</Link>
        <form action={deleteAllUsers}>
          <button type="submit">Delete All</button>
        </form>
        <XLSXUpload/>
      </div>
      <div>
        {renderedUsers}
      </div>
    </div>
  );

}

