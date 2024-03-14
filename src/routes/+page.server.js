import { API_KEY } from "$env/static/private";
import { redirect } from '@sveltejs/kit';
import { getPlayer } from "$lib/query.js";
import db from "$lib/db.js";

export async function load() {
    // fetch top 4 most searched username's from the database
    const topRequests = await db.collection("requests").find({ username: { $ne: "SirArchibald97" } }).sort({ requests: -1 }).limit(4).toArray();

    const profiles = [];
    if (topRequests.length === 0) return { profiles: [] };
    for (let request of topRequests) {
        // fetch player data from the MCC Island API
        const query = getPlayer.replace("%%UUID%%", request.uuid);
        const api_res = await fetch("https://api.mccisland.net/graphql", {
            headers: { "Content-Type": "application/json", "X-API-Key": `${API_KEY}` },
            method: "POST",
            body: JSON.stringify({ query })
        });
        const { data: { player }} = await api_res.json();
        if (player) profiles.push({ uuid: request.uuid, username: request.username, player: player });
    }
    return { profiles };
}

export const actions = {
    // redirects to the provided player's profile page
    default: async ({ request }) => {
        const data = await request.formData();
        const username = await data.get("username");

        const mj_res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        const { name } = await mj_res.json();
        throw redirect(301, `/player/${name || username}`);
    }
}