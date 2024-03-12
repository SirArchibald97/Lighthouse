import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { id, name } = await mj_res.json();
        if (!id) throw error(404);

        throw redirect(301, `/player/${name}`);
    }
}