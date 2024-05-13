import { DEV, SAD_API_KEY } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import db from "$lib/db.js";

export async function load() {
    const players = await db.collection("players")
        .find({ [`player.trophies`]: { $exists: true } })
        .project({ uuid: 1, "player.username": 1, "player.ranks": 1, "player.level": 1, "player.trophies": 1 })
        .limit(1000)
        .toArray();
    for (let player of players) player._id = player._id.toString();
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