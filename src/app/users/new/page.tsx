import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as actions from '@/actions';
import Link from 'next/link';

export default function CreateUserPage() {

    async function createUser(formData: FormData) {
        'use server';
        await actions.createUser(formData);
        redirect("/");
    }

    return <div>
        <div>
            <Link href="/">&lt; Home</Link>
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h3 className="text-2xl font-bold text-gray-800">Create a User</h3>
            <form action={createUser}>
                <div>
                    <label htmlFor="name" className="block text-gray-600 font-medium mb-1">
                        Name
                    </label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" name="name" id="name" />
                </div>
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Email</label>
                    <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" name="email" id="email" />
                </div>
                <div className="mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Create
                    </button>
                </div>
            </form>
        </div>

    </div>;
}