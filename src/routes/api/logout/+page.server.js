import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    cookies.delete("user", { path: "/" });
    throw redirect(301, "/");
}