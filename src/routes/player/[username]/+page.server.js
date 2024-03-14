import { redirect } from '@sveltejs/kit';
import { API_KEY } from "$env/static/private";
import { getPlayer } from "$lib/query.js";
import { formatUUID, getRankIcon } from "$lib/utils.js";
import db from "$lib/db.js";

export async function load({ params }) {
    // check username is an existing Minecraft account
    const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${params.username}`);
    const { id, name } = await mj_res.json();
    if (!id) return { success: false, player: {} };
    
    // fetch player data from the MCC Island API
    const query = getPlayer.replace("%%UUID%%", await formatUUID(id));
    const api_res = await fetch("https://api.mccisland.net/graphql", {
        headers: { "Content-Type": "application/json", "X-API-Key": `${API_KEY}` },
        method: "POST",
        body: JSON.stringify({ query })
    });
    const { data: { player }} = await api_res.json();

    // if the player exists, update requests in the database and return data to client
    if (player) {
        const result = await db.collection("requests").findOne({ username: name });
        if (result) {
            await db.collection("requests").updateOne({ username: name }, { $inc: { requests_current: 1 } });
        } else {
            await db.collection("requests").insertOne({ username: name, uuid: await formatUUID(id), requests_current: 1 });
        }

        return { uuid: await formatUUID(id), name: name, player, rank: getRankIcon(player.ranks), searches: { current: result.requests_current || 0, one_month_ago: result.requests_m1 || 0, two_months_ago: result.requests_m2 || 0 } };
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