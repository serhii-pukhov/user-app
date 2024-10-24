import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as actions from '@/actions';

export default function CreateUserPage() {

    async function createUser(formData: FormData) {
        'use server';
        actions.createUser(formData);
        revalidatePath('/');
        redirect("/");
    }

    return <form action={createUser}>
        <h3>Create a User</h3>
        <div>
            <label>Name</label>
            <input name="name" id="name" />
        </div>
        <div>
            <label>Email</label>
            <input name="email" id="email" />
        </div>
        <div>
            <button type="submit">
                Create
            </button>
        </div>
    </form>;
}