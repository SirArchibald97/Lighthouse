import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    throw redirect(301, `/player/${params.username}/games`);
}

export const actions = {
    // redirects to the provided player's profile page
    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
}