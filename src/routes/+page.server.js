import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");
        console.log(username);

        throw redirect(301, `/player/${username}`);
    }
}