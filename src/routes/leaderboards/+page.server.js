import { redirect } from "@sveltejs/kit";
import db from "$lib/db.js";

export async function load() {
    const allPlayers = await db.collection("players").find({}).toArray();
    allPlayers.forEach(p => p._id = p._id.toString());
    
    return { players: allPlayers }
}

export const actions = {
    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
}