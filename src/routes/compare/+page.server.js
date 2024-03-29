import { redirect } from '@sveltejs/kit';
import { SAD_API_KEY, DEV } from "$env/static/private";

export async function load({ cookies }) {
    const favourites = cookies.get("favourites") ? JSON.parse(cookies.get("favourites")) : [];
    return { favourites };
}

export const actions = {
    home: async () => {
        throw redirect(301, "/");
    },

    compare: async () => {
        throw redirect(301, "/compare");
    },

    comparelookup: async ({ request, cookies }) => {
        const data = await request.formData();
        const playerIndex = await data.get("player");
        const uuid = await data.get("uuid");
        
        const cookie = cookies.get("compare") ? JSON.parse(cookies.get("compare")) : [];
        
        const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/${uuid}`, { headers: { "auth": `${SAD_API_KEY}` } });
        const { player } = await res.json();

        if (!player) {
            cookies.set("compare", JSON.stringify(playerIndex === "1" ? [cookie[0], null] : [null, cookie[1]]), { path: "/" });
            const newCookie = JSON.parse(cookies.get("compare"));
            return { players: newCookie };
        } else {
            cookies.set("compare", JSON.stringify(playerIndex === "1" ? [cookie[0], null] : [null, cookie[1]]), { path: "/" });
        }
    },
}