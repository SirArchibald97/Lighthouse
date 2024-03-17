import { redirect } from '@sveltejs/kit';
import { SAD_API_KEY, DEV } from "$env/static/private";
import { formatUUID, getRankIcon } from "$lib/utils.js";
import db from "$lib/db.js";

export async function load({ params }) {
    // check username is an existing Minecraft account
    const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    const { id, name } = await mj_res.json();
    if (!id) return { success: false, player: {} };
    
    // fetch player data from the MCC Island API
    const res = await fetch(`${DEV === "true" ? "http://localhost:3000" : "https://api.sirarchibald.dev"}/islandstats/${await formatUUID(id)}`, { headers: { "auth": `${SAD_API_KEY}` } });
    const { player } = await res.json();

    // if the player exists, update requests in the database and return data to client
    if (player) {
        const result = await db.collection("requests").findOne({ username: name });
        if (result) {
            await db.collection("requests").updateOne({ username: name }, { $inc: { requests_current: 1 } });
        } else {
            await db.collection("requests").insertOne({ username: name, uuid: await formatUUID(id), requests_current: 1 });
        }

        return { uuid: await formatUUID(id), name: name, player, rank: getRankIcon(player.ranks), views: result.requests_current };
    } else return { success: false, player: {} };
}

export const actions = {
    // redirects to the provided player's profile page
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");
        throw redirect(301, `/player/${username}`);
    }
}