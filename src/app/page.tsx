import * as actions from "@/actions";
import UserManagementContainer from "@/components/UserManagementContainer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await actions.findUsers();

  return <UserManagementContainer users={users} />

}


