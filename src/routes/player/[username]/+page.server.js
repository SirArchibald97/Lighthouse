import { redirect } from '@sveltejs/kit';
import { SAD_API_KEY, DEV } from "$env/static/private";
import { formatUUID, getRankIcon } from "$lib/utils.js";
import db from "$lib/db.js";

export async function load({ params, cookies }) {
    // check username is an existing Minecraft account
    const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    const { id, name } = await mj_res.json();
    if (!id) return { success: false, player: {} };
    if (params.username !== name) throw redirect(301, `/player/${name}`);
    
    // fetch player data from the MCC Island API
    const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/player/${await formatUUID(id)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Accept": "application/json", "auth": `${SAD_API_KEY}` },
    });
    const data = await res.json();
    const player = data?.player || null;

    // if the player exists, update requests in the database and return data to client
    if (player) {
        const result = await db.collection("requests").findOne({ username: name });
        const isFavourite = cookies.get("favourites") ? JSON.parse(cookies.get("favourites")).find(f => f.username === name) : false;

        return { uuid: player.uuid, name: player.username, player, rank: getRankIcon(player.ranks), views: result?.requests || 0, favourite: isFavourite };
    } else return { success: false, player: {} };
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

    favourite: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = await data.get("username");
        const uuid = await data.get("uuid");
        const ranks = await data.get("ranks");

        const favourites = cookies.get("favourites") ? JSON.parse(cookies.get("favourites")) : [];
        if (!favourites.find(f => f?.username === username)) {
            cookies.set("favourites", JSON.stringify([...favourites, { uuid, username, ranks: ranks.split(",") }]), { path: "/" });
            return { favourites: [...favourites, { uuid, username, ranks: ranks.split(",") }] };
        } else {            
            favourites.splice(favourites.indexOf(favourites.find(f => f.username === username)), 1);
            cookies.set("favourites", JSON.stringify(favourites), { path: "/" });
            return { favourites };
        }
    },

    home: async () => {
        throw redirect(301, "/");
    },

    compare: async () => {
        throw redirect(301, "/compare");
    }
}