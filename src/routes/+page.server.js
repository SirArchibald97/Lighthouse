import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

export async function load() {
    const topRequests = await db.collection("requests").find().sort({ requests: -1 }).limit(4).toArray();
    return { topRequests: JSON.parse(JSON.stringify(topRequests)) };
}

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    }
}