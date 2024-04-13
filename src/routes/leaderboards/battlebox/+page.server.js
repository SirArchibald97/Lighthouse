import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
    let players = await db.collection("players").find({ "player.statistics": { $exists: true }}).toArray();
    players.forEach(p => p._id = p._id.toString());
    return { players };
}

export const actions = {
    lookup: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    },
    
    home: async () => {
        throw redirect(301, "/");
    },
}